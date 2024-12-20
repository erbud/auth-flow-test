"use client";

import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const codeStatus = searchParams.get("codeStatus") ?? "";
  const response = { status: "KO", message: "" };

  switch (codeStatus) {
    case "200":
      response.status = "OK";
      response.message = "La dirección de correo electrónico se ha verificado correctamente ¡Inicia sessión!";
      break;
    case "401":
      response.message = "La dirección de correo electrónico no está registrada.";
      break;
    case "403":
      response.message = "La dirección de correo electrónico ya estaba verificada.";
      break;
    case "404":
      response.message = "El código de verificación no es correcto.";
      break;
    default:
      response.message = "Algo ha salido mal, vuelve a intentar restaurar la contraseña más tarde.";
  }  

  return (
    <div className="p-4">
      <h1 className="h1 text-center">
        Verificación de email
      </h1>
      <p className=" text-center text-xl">
        <strong>{ response.status }</strong>
        <span className="text-gray-400"> | </span>
        { response.message }
      </p>
    </div>
  );
}