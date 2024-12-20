import { object, string } from "zod";
 
export const signinSchema = object(
  {
    email:    string()
                .min(1, {message: "El e–mail es requerido"})
                .email({message: "El e–mail no tiene un formato correcto"}),
    password: string()
                .min(8, {message: "La contraseña debe tener mínimo 8 catacteres"})
                .max(32, {message: "La contraseña debe tener máximo 32 catacteres"})
                .regex(/[A-Z]/, {message: "La contraseña debe contener un carácter en mayúscula"})
                .regex(/[a-z]/, {message: "La contraseña debe contener un carácter en minúscula"})
                .regex(/[0-9]/, {message: "La contraseña debe contener un número"})
                .regex(/[#?!@$%^&*-]/, {message: "La contraseña debe contener un carácter especial"})
  }
);

export const emailSchema = object(
  {
    email:  string()
              .min(1, {message: "El e–mail es requerido"})
              .email({message: "El e–mail no tiene un formato correcto"})
  }
);