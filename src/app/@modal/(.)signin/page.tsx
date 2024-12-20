"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import SignIn from "@/components/auth/SignInForm";

export default function SignInModal() {
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
        className="max-w-sm rounded backdrop:bg-slate-300/80"
      >
        <button
          className="absolute top-2 right-4 border-none text-3xl"
          onClick={() => dialogRef.current?.close()}
        >
          &times;
        </button>
        <SignIn />
      </dialog>
    </div>
  );
}