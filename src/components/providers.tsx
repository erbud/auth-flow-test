import { cookies } from "next/headers";
import { AuthProvider } from "@/components/auth/Provider";

export async function Providers({
  children
}: {
  children: React.ReactNode
}) {
  const token = (await cookies()).get("AuthSession")?.value ?? "";
  const isLoggedByDefault = (token !== "");

  return (
    <AuthProvider isLoggedByDefault={isLoggedByDefault}>
      {
        children
      }
    </AuthProvider>
  );
}