import { useEffect, useState } from "react";
import { RestorePassType } from "@/lib/definitions";
import { verifyCodeAuth } from "@/actions/auth";

export default function useAuthCode({ email, code }: RestorePassType) {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const verify = () => {
    verifyCodeAuth({ email, code }).then(setIsValid);
  };

  useEffect(verify, []);

  return { isValid, verify };
}