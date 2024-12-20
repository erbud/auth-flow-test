"use client";

import { createContext, useState } from "react";
import { AuthContextType } from "@/lib/definitions";

const defaultData: AuthContextType = { logged: false, setLogged: () => {} };
export const AuthContext = createContext(defaultData);

export function AuthProvider({
  children,
  isLoggedByDefault,
}: {
  children: React.ReactNode;
  isLoggedByDefault: boolean;
}) {
  const [logged, setLogged] = useState<boolean>(isLoggedByDefault);
  const value: AuthContextType = { logged, setLogged };

  return (
    <AuthContext.Provider value={value}>
      {
        children
      }
    </AuthContext.Provider>
  );
}