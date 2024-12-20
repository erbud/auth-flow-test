"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TbLockCog } from "react-icons/tb";
import { getSession } from "@/actions/session";
import { EmailInputType } from "@/lib/definitions";

export default function RequestPassForm() {
  const [email, setEmail] = useState<string>('');
  const [emailRequestPass, setEmailRequestPass] = useState<boolean>(false);
  const [errorValidating, setErrorValidating] = useState<boolean>(false);
  const { register, handleSubmit, setError, formState: { errors } } = useForm<EmailInputType>();
  
  useEffect(() => {
    getSession().then((data) => {
      data && setEmail(data.email);
    });
  }, []);

  const onSubmit: SubmitHandler<EmailInputType> = async ({ email }) => {
    const response = await fetch('/api/auth/request-pass', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await response.json();

    if (response.ok) {
      setEmailRequestPass(true);
    }
    else {
      setError('email', { message: data?.message, type: '401' });
      setErrorValidating(true);
    }
  };

  return (
    <section id="request-pass" className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {
          (emailRequestPass)
            ? "Revisa tu correo"
            : "Restaurar contraseña"
        }
      </h1>
      {
        (emailRequestPass)
          ? (
              <p>
                Comprueba tu bandeja de correo electrónico (y la carpeta de correo no deseado) y accede al enlace para cambiar tu contraseña.
              </p>
            )
          : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <p>
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
                  <span className={`flex-row relative ${email ? '-z-10' : ''}`}>
                    { email && <TbLockCog size="24" className="absolute right-2 top-2 text-gray-500" /> }
                    <input
                      type="email"
                      id="email"
                      required
                      defaultValue={email}
                      disabled={(email !== '')}
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
                      className={`${errorValidating ? 'error-mark' : '' } ${email ? 'text-gray-500' : 'text-black'}`}
                      onFocus={() => setErrorValidating(false)}
                    />
                  </span>
                </p>
                <button type="submit">
                  Enviar email
                </button>
              </form>
            )
      }
    </section>
  );
}