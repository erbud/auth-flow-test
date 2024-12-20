import { useContext } from "react";
import { AuthContext } from "@/components/auth/Provider";

export const useAuthContext = () => {
  return useContext(AuthContext)
};