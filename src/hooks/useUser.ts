import { useEffect, useState } from "react";
import { EmailInputType, UserType } from "@/lib/definitions";
import { getUser } from "@/actions/users";

export default function useUser({ email }: EmailInputType) {
  const [data, setData] = useState<UserType | null>(null);

  const get = () => {
    getUser(email).then(setData);
  };
  useEffect(get, []);

  return { data, get };
}