import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { signinSchema } from "@/lib/zod";
import { UpdatePassInputsType, UserType } from "@/lib/definitions";
import { verifyCodeAuth, removeCodeAuth } from "@/actions/auth";
import { sendEmailVerification } from "@/actions/email";
import { getUser, updatePassword } from "@/actions/users";

export async function GET(request: NextRequest) {
  const searchParams: URLSearchParams = request.nextUrl.searchParams;
  const email = searchParams.get('email') ?? "";
  const password = searchParams.get('password') ?? "";
  const code = searchParams.get('code') ?? "";

  return validateData({ email, password, code });
}

export async function POST(request: NextRequest) {
  const searchParams: UpdatePassInputsType = await request.json();
  const { email, password, code } = {...searchParams};

  return validateData({ email, password, code });
}

async function validateData({ email, password, code }: UpdatePassInputsType) {
  try {
    signinSchema.parse({ email, password });

    return updatePass({ email, password, code });
  }
  catch(error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ email, message: error.issues[0].message }, { status: 401 });
    }
  }
}

async function updatePass({ email, password, code }: UpdatePassInputsType) {
  try {
    if (!email || !password || !code) {
      return NextResponse.json({ email: "Desconocido", message: "Se requieren el correo electrónico y la contraseña" }, { status: 401 });
    }
    const user: UserType | null = await getUser(email);

    if (!user) {
        return NextResponse.json({ email, message: "La dirección de correo electrónico no está registrada" }, { status: 401 });
    }
    else if (user && !user?.verified) {
      await sendEmailVerification({ email, code });
      return NextResponse.json({ email, verified: false, message: "La dirección de correo electrónico no está verificada. Revisa la bandeja de entrada (y la carpeta de correo no deseado) de tu email" }, { status: 403 });
    };
    const isValidCode = await verifyCodeAuth({ email, code });

    if (isValidCode) {
      await removeCodeAuth({ email, code });
      await updatePassword({ email, password });
    }
    return NextResponse.json({ email }, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}