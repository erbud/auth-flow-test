"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getSession } from "@/actions/session";
import { getUser } from "@/actions/users";
import { UserType, SettingsInputsType } from "@/lib/definitions";
import Link from "next/link";

export default function EditSettingsForm() {
  const [ user, setUser ] = useState<UserType | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<SettingsInputsType>();
  
  useEffect(() => {
    getSession().then(async (data) => {
      const user = data && await getUser(data.email);
      user && setUser(user);
    });
  }, []);
  
  const onSubmit: SubmitHandler<SettingsInputsType> = async ({ name }) => {
    const response = await fetch('/api/users/set-name', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });

    if (response.ok) {
      const submitButton = document.querySelector('button[type=submit');
      submitButton?.classList.add("bg-green-600", "focus:ring-green-500");

      setTimeout(() => {
        submitButton?.classList.remove("bg-green-600", "focus:ring-green-500");
      }, 2000);
    }
  };

  return (
    <section id="edit-settings" className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Ajustes
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <fieldset className="border-t-8 border-solid border-gray-300 p-3">
          <legend className="text-md px-2 font-bold text-gray-500">
            Datos de acceso
          </legend>
          <p className="px-2 text-sm font-medium text-gray-700">
            Email: <strong>{ user?.email }</strong>.
          </p>
          <p className="px-2 text-sm font-medium text-gray-700">
            <Link href="/request-pass" className="underline">
              Restaurar contraseña para este sitio
            </Link>
          </p>
        </fieldset>
        <fieldset className="border-t-8 border-solid border-gray-300 p-3">
          <legend className="text-md px-2 font-bold text-gray-500">
            Para dirijirnos a ti…
          </legend>
          <p className="px-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Tu <strong>nombre</strong> de pila o apodo
            </label>
            <input
              type="text"
              id="name"
              defaultValue={user?.name}
              maxLength={15}
              {...register("name")}
            />
          </p>
        </fieldset>
        <p className="px-4">
          <button type="submit">
            Guardar
          </button>
        </p>
        <p className="text-center text-sm font-medium">
          <Link href="/settings?removeAccount=true">
            Borrar cuenta
          </Link>
        </p>
      </form>
    </section>
  );
}