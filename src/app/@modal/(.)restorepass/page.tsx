"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import RestorePassForm from "@/components/auth/RequestPassForm";

export default function RestorePassModal() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <div>
      <dialog
        ref={dialogRef}
        onClose={() => router.back()}
        className="max-w-sm p-4 rounded backdrop:bg-slate-300/80"
      >
        <button
          className="absolute top-2 left-4 border-none text-3xl"
          onClick={() => dialogRef.current?.close()}
        >
          ←
        </button>
        <RestorePassForm />
      </dialog>
    </div>
  );
}