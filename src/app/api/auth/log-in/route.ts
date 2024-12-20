import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { AuthInputsType, UserType } from "@/lib/definitions";
import { setSession } from "@/actions/session";
import { getUser } from "@/actions/users";
import { signinSchema } from "@/lib/zod";
import bcrypt from "bcryptjs";

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

    return login({ email, password });
  }
  catch(error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ email, message: error.issues[0].message }, { status: 401 });
    }
  }
}

async function login({ email, password }: AuthInputsType) {
  try {
    const user: UserType | null = await getUser(email);

    if (!user) {
      return NextResponse.json({ email, message: "La dirección de correo electrónico no está registrada" }, { status: 401 });
    }
    else if (!user?.verified) {
      return NextResponse.json({ email, message: "La dirección de correo electrónico no está verificada" }, { status: 401 });
    }
    else if (!bcrypt.compareSync(password, user.password)) {
      return NextResponse.json({ email, message: "La contraseña no coincide" }, { status: 401 });
    }
    else {
      const token = await setSession({
        id: user.id,
        email: user.email,
        role: user.role
      });
      return NextResponse.json({ token }, { status: 200 });
    }
  }
  catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}