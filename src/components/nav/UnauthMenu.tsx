"use client";

import { useAuthContext } from "@/hooks/useAuthContext";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";

export default function UnauthMenu() {
  const { logged } = useAuthContext();

  return !logged && (
    <nav className="flex flex-1 justify-end">
      <ul className="flex gap-3">
        <li className="content-center">
          <Link href="/sign-up" title="¡Regístrate!">
            <FaRegEdit size="32" />
          </Link>
        </li>
        <li className="content-center">
          <Link href="/sign-in" title="Iniciar sesión">
            <FaRegCircleUser size="32" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}