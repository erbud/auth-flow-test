"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import SignUp from "@/components/auth/SignUpForm";

export default function SignUpModal() {
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
        className="rounded backdrop:bg-slate-300/80"
      >
        <button
          className="absolute top-2 right-4 border-none text-3xl"
          onClick={() => dialogRef.current?.close()}
        >
          &times;
        </button>
        <SignUp />
      </dialog>
    </div>
  );
}