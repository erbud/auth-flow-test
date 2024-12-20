import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { emailSchema } from "@/lib/zod";
import { EmailInputType, UserType } from "@/lib/definitions";
import { setCodeAuth } from "@/actions/auth";
import { sendEmailRestorePass } from "@/actions/email";
import { getUser } from "@/actions/users";

export async function GET(request: NextRequest) {
  const searchParams: URLSearchParams = request.nextUrl.searchParams;
  const email = searchParams.get('email') ?? "";

  return validateData({ email });
}

export async function POST(request: NextRequest) {
  const searchParams: EmailInputType = await request.json();
  const { email } = {...searchParams};

  return validateData({ email });
}

async function validateData({ email }: EmailInputType) {
  try {
    emailSchema.parse({ email });

    return requestPass({ email });
  }
  catch(error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ email, message: error.issues[0].message }, { status: 401 });
    }
  }
}

async function requestPass({ email }: EmailInputType) {
  try {
    if (!email) {
      return NextResponse.json({ email: "Desconocido", message: "Se requiere la dirección de correo electrónico" }, { status: 401 });
    }
    const user: UserType | null = await getUser(email);

    if (!user) {
      return NextResponse.json({ email, message: "La dirección de correo electrónico no está registrada" }, { status: 401 });
    }
    const code = await setCodeAuth({ email });
    await sendEmailRestorePass({ email, code });
    
    return NextResponse.json({ email }, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}