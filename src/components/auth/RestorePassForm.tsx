"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { RestorePassType, PassInputsType } from "@/lib/definitions";

export default function RestorePassForm({ email, code }: RestorePassType) {
  const [emailRestorePass, setEmailRestorePass] = useState<boolean>(false);
  const [errorValidating, setErrorValidating] = useState<boolean>(false);
  const { register, handleSubmit, watch, setError, formState: { errors } } = useForm<PassInputsType>();
  
  const onSubmit: SubmitHandler<PassInputsType> = async ({ password }) => {
    const response = await fetch('/api/auth/update-pass', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, code })
    });
    const data = await response.json();

    if (response.ok) {
      setEmailRestorePass(true);
    }
    else {
      setError('password', { message: data?.message, type: '401' });
      setErrorValidating(true);
    }
  };

  return (
    <section id="restore-password" className="p-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {
          (emailRestorePass)
            ? "¡Contraseña actualizada!"
            : "Restaurar contraseña"
        }
      </h1>
      {
        (emailRestorePass)
          ? (
              <p>
                La contraseña ha sido actualizada correctamente. Ya puedes iniciar sessión.
              </p>
            )
          : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    <strong>Contraseña</strong> para acceder a este sitio
                    {
                      errors?.password?.message &&
                      <>
                        <br />
                        <span className="text-sm text-rose-700 bg-rose-100">
                          (*) {errors.password.message}
                        </span>
                      </>
                    }
                  </label>
                  <input
                    type="password"
                    id="password"
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
                    className={errorValidating ? 'error-mark' : ''}
                    onFocus={() => setErrorValidating(false)}
                  />
                </div>
                <div>
                  <label htmlFor="password-confirm" className="block text-sm font-medium text-gray-700">
                    <strong>Confirma</strong> la contraseña
                    {
                      errors?.passwordConfirm?.message && 
                      <>
                        <br />
                        <span className="text-sm text-rose-700 bg-rose-100">
                          (*) {errors.passwordConfirm.message}
                        </span>
                      </>
                    }
                  </label>
                  <input
                    type="password"
                    id="password-confirm"
                    {...register("passwordConfirm", {
                      validate: (value: string) => {
                        if (watch('password') !== value) {
                          return `La contraseña no coincide`;
                        }
                      }
                    })}
                    className={errorValidating ? 'error-mark' : ''}
                    onFocus={() => setErrorValidating(false)}
                  />
                </div>
                <button type="submit">
                  Actualizar
                </button>
              </form>
            )
      }  
    </section>
  );
}