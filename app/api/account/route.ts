import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { accountFromSession, SESSION_COOKIE } from "@/lib/auth";
import { db } from "@/lib/db";

export async function DELETE(request: Request) {
  const account = await accountFromSession();
  const { handle } = await request.json().catch(() => ({}));

  if (!account || !account.handle) return NextResponse.json({ error: "Sign in to manage your account." }, { status: 401 });
  if (handle !== account.handle) return NextResponse.json({ error: "Type your exact handle to confirm deletion." }, { status: 400 });

  const sql = db();
  await sql.transaction([
    sql`delete from waitlist_codes where email = ${account.email}`,
    sql`delete from waitlist_accounts where id = ${account.id}`,
  ]);

  const response = NextResponse.json({ ok: true });
  const session = (await cookies()).get(SESSION_COOKIE)?.value;
  // The account delete cascades to every session. This explicit cleanup also
  // covers an already-expired or otherwise detached session token.
  if (session) await sql`delete from waitlist_sessions where token = ${session}`;
  response.cookies.set(SESSION_COOKIE, "", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 0 });
  return response;
}
