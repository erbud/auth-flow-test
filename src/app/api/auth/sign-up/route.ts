import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { signinSchema } from "@/lib/zod";
import { AuthInputsType, UserType } from "@/lib/definitions";
import { sendEmailVerification } from "@/actions/email";
import { getUser, setEditor } from "@/actions/users";

export async function GET(request: NextRequest) {
  const searchParams: URLSearchParams = request.nextUrl.searchParams;
  const email = searchParams.get('email') ?? "";
  const password = searchParams.get('password') ?? "";

  return validateData({ email, password });
}

export async function POST(request: NextRequest) {
  const searchParams: AuthInputsType = await request.json();
  const { email, password } = {...searchParams};

  return validateData({ email, password });
}

async function validateData({ email, password }: AuthInputsType) {
  try {
    signinSchema.parse({ email, password });

    return signup({ email, password });
  }
  catch(error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ email, message: error.issues[0].message }, { status: 401 });
    }
  }
}

async function signup({ email, password }: AuthInputsType) {
  try {
    if (!email || !password) {
      return NextResponse.json({ email: "Desconocido", message: "Se requieren el correo electrónico y la contraseña" }, { status: 401 });
    }
    const user: UserType | null = await getUser(email);

    if (user && user?.verified) {
      return NextResponse.json({ email, message: "Ya existe un usuario con esta dirección de correo electrónico" }, { status: 401 });
    }
    else if (user && !user?.verified) {
      await sendEmailVerification({ email, code: user?.id });
      return NextResponse.json({ email, verified: false, message: "Ya existe un usuario con esta dirección de correo electrónico pero no está verificada. Revisa la bandeja de entrada (y la carpeta de correo no deseado) de tu email" }, { status: 403 });
    }
    else if (!user) {
      const code = await setEditor({ email, password });
      await sendEmailVerification({ email, code });
    };
    return NextResponse.json({ email }, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}