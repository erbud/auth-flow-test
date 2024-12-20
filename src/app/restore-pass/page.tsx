"use client";

import { useSearchParams } from 'next/navigation';
import useAuthCode from '@/hooks/useAuthCode';
import useUser from '@/hooks/useUser';
import RestorePassForm from "@/components/auth/RestorePassForm";

export default function RestorePassPage() {
  let   codeStatus = "200";
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const code = searchParams.get("code") ?? "";
  const response = { status: "KO", message: "" };
  const user = useUser({ email });
  const { data: userData } = {...user};
  const { verified: isUserVerified } = {...userData};
  const codeAuth = useAuthCode({ email, code });
  const { isValid: isValidCodeAuth } = {...codeAuth};

  if (userData && isUserVerified && isValidCodeAuth) {
    codeStatus = "200";
  }
  else if (!userData) {
    codeStatus = "401";
  }
  else if (!isUserVerified) {
    codeStatus = "403";
  }
  else if (!isValidCodeAuth) {
    codeStatus = "404";
  }
  else {
    codeStatus = "500";
  }

  switch (codeStatus) {
    case "200":
      response.status = "OK";
      response.message = "La dirección de correo electrónico se ha verificado correctamente ¡Inicia sessión!";
      break;
    case "401":
      response.message = "La dirección de correo electrónico no está registrada.";
      break;
    case "403":
      response.message = "La dirección de correo electrónico no está verificada.";
      break;
    case "404":
      response.message = "El código de verificación no es correcto.";
      break;
    default:
      response.message = "Algo ha salido mal, vuelve a intentar restaurar la contraseña más tarde.";
  }

  return typeof isValidCodeAuth === "boolean" &&
  (
    (codeStatus === "200")
      ? (
          <div className="max-w-sm mx-auto">
            <RestorePassForm email={email} code={code} />
          </div>
        )
      : (
          <div className="p-4">
            <h1 className="h1 text-center">
              Restaurar contraseña
            </h1>
            <p className=" text-center text-xl">
              <strong>{ response.status }</strong>
              <span className="text-gray-400"> | </span>
              { response.message }
            </p>
          </div>
        )
  );
}