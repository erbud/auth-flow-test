"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/hooks/useAuthContext";
import { removeUser } from "@/actions/users";

export default function RemoveAccountModal() {
  const { setLogged } = useAuthContext();
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-70 overflow-y-auto w-full h-full px-4 flex items-center justify-center">
      <div className="max-w-lg p-4 border shadow-lg rounded-md bg-white">
        <h3 className="m-0 p-0 text-2xl font-bold text-gray-900">
          Borrar cuenta
        </h3>
        <p className="py-4 text-lg text-gray-500">
          <strong>¿Estás seguro de querer borrar tu cuenta en deCompeti?</strong> Se perderán todas las competiciones que gestionas y no se podrán recuperar.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={router.back}
            className="cancel-important-action-button"
          >
            Cancelar
          </button>
          <button
            onClick={async () => {
              await removeUser();
              setLogged(false);
              router.replace("/");
            }}
            className="confirm-important-action-button"
          >
            Sí, borrar cuenta
          </button>
        </div>
      </div>
    </div>
  );
}