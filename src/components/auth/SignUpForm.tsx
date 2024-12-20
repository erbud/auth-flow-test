"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignupInputsType } from "@/lib/definitions";

export default function SignUpForm() {
  const [emailVerification, setEmailVerification] = useState<boolean>(false);
  const [errorValidating, setErrorValidating] = useState<boolean>(false);
  const { register, handleSubmit, watch, setError, formState: { errors } } = useForm<SignupInputsType>();
  
  const onSubmit: SubmitHandler<SignupInputsType> = async ({ email, password }) => {
    const response = await fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const responseJson = await response.json();

    if (response.ok || response.status === 403) {
      setEmailVerification(true);
    }
    else {
      setError('email', { message: responseJson?.message, type: '401' });
      setErrorValidating(true);
    }
    return response.status;
  };

  return (
    <section id="sign-up" className="p-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {
          (emailVerification)
            ? "Verifica tu correo"
            : "Crear cuenta"
        }
      </h1>
      {
        (emailVerification)
          ? (
              <p className="success-message">
                Comprueba tu bandeja de correo electrónico (y la carpeta de correo no deseado) y verifica tu dirección email para poder iniciar sessión.
              </p>
            )
          : (
              <form id="sign-up-form" method="post" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Tu dirección de <strong>email</strong>
                    {
                      errors?.email?.message &&
                      <>
                        <br />
                        <span className="error-message text-sm text-rose-700 bg-rose-100">
                          (*) {errors.email.message}
                        </span>
                      </>
                    }
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
                    {
                      errors?.password?.message &&
                      <>
                        <br />
                        <span className="error-message text-sm text-rose-700 bg-rose-100">
                          (*) {errors.password.message}
                        </span>
                      </>
                    }
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
                          return `
                            Debe contener más de 7 carácteres.
                            Uno en mayúsculas.
                            Uno en minúsculas.
                            Un número.
                            Y un carácter especial.
                          `;
                        }
                      }
                    })}
                  />
                </div>
                <div>
                  <label htmlFor="password-confirm" className="block text-sm font-medium text-gray-700">
                    <strong>Confirma</strong> la contraseña
                    {
                      errors?.passwordConfirm?.message && 
                      <>
                        <br />
                        <span className="error-message text-sm text-rose-700 bg-rose-100">
                          (*) {errors.passwordConfirm.message}
                        </span>
                      </>
                    }
                  </label>
                  <input
                    type="password"
                    id="password-confirm"
                    required
                    {...register("passwordConfirm", {
                      validate: (value: string) => {
                        if (watch('password') !== value) {
                          return `La contraseña no coincide`;
                        }
                      }
                    })}
                  />
                </div>
                <button type="submit">
                  Aceptar
                </button>
              </form>
            )
      }  
    </section>
  );
}