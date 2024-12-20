"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthInputsType } from "@/lib/definitions";
import { useAuthContext } from "@/hooks/useAuthContext";
import Link from "next/link";

export default function SignInForm() {
  const router = useRouter();
  const { setLogged } = useAuthContext();
  const { register, handleSubmit, formState: { errors } } = useForm<AuthInputsType>();
  const [errorValidating, setErrorValidating] = useState<boolean>(false);
  
  const onSubmit: SubmitHandler<AuthInputsType> = async ({ email, password }) => {
    const response = await fetch('/api/auth/log-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    setLogged(response.ok);

    if (response.ok) {
      router.replace("/");
    }
    else {
      setErrorValidating(true);
    }
  };

  return (
    <section id="sign-in" className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Iniciar sesión
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Tu dirección de <strong>email</strong>
          </label>
          <input
            type="email"
            id="email"
            required
            {...register("email", {
              validate: (value: string) => {
                const emailFormat = /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

                const validation = {
                  format: value.match(emailFormat)
                };
                if (!validation.format) {
                  return `El e–mail no es válido`;
                }
              }
            })}
            className={errorValidating ? 'error-mark' : ''}
            onFocus={() => setErrorValidating(false)}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            <strong>Contraseña</strong> para este sitio
          </label>
          <input
            type="password"
            id="password"
            required
            {...register("password", {
              validate: (value: string) => {
                const atLeastOneUppercase = /[A-Z]/g; // capital letters from A to Z
                const atLeastOneLowercase = /[a-z]/g; // small letters from a to z
                const atLeastOneNumeric = /[0-9]/g; // numbers from 0 to 9
                const atLeastOneSpecialChar = /[#?!@$%^&*-]/g; // any of the special characters within the square brackets
                const eightCharsOrMore= /.{8,}/g; // eight characters or more

                const validation = {
                  uppercase: value.match(atLeastOneUppercase),
                  lowercase: value.match(atLeastOneLowercase),
                  number: value.match(atLeastOneNumeric),
                  specialChar: value.match(atLeastOneSpecialChar),
                  eightCharsOrGreater: value.match(eightCharsOrMore),
                };
                if (!validation.uppercase || !validation.lowercase || !validation.number || !validation.specialChar || !validation.eightCharsOrGreater) {
                  return `La contraseña no es válida`;
                }
              }
            })}
            className={errorValidating ? 'error-mark' : ''}
            onFocus={() => setErrorValidating(false)}
          />
        </div>
        <p>
          <button type="submit">
            Acceder
          </button>
        </p>
        <p className="text-center">
          <Link href="/request-pass">
            ¿Has olvidado tu contraseña?
          </Link>
        </p>
      </form>
    </section>
  );
}