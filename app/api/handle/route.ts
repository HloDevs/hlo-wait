import { NextResponse } from "next/server";
import { accountFromSession, validateHandle } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const account = await accountFromSession();
  if (!account) {
    return NextResponse.json({ error: "Your session has ended. Start again." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const handle = typeof body?.handle === "string" ? body.handle.trim().toLowerCase() : "";

  const validation = validateHandle(handle);
  if (!validation.isValid) {
    const status = validation.status === "RESERVED" ? 409 : 400;
    return NextResponse.json({ error: validation.error }, { status });
  }

  try {
    const rows = await db()`update waitlist_accounts set handle = ${handle} where id = ${account.id} and handle is null returning handle`;
    if (!rows.length) {
      return NextResponse.json({ error: "This handle was just claimed. Try another." }, { status: 409 });
    }
    return NextResponse.json({ handle: rows[0].handle });
  } catch {
    return NextResponse.json({ error: "That handle is unavailable. Try another." }, { status: 409 });
  }
}
