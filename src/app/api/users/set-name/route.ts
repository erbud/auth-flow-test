import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { SettingsInputsType } from "@/lib/definitions";
import { getSession } from "@/actions/session";
import { updateName } from "@/actions/users";

export async function GET(request: NextRequest) {
  const searchParams: URLSearchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name') ?? "";

  return setName({ name });
}

export async function POST(request: NextRequest) {
  const searchParams: SettingsInputsType = await request.json();
  const { name } = {...searchParams};

  return setName({ name });
}

async function setName({ name }: { name: string }) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ user: "Desconocido", message: "Se requiere el identificador del usuario" }, { status: 401 });
    }
    await updateName({ id: session.id, name });
    
    return NextResponse.json({ name }, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}