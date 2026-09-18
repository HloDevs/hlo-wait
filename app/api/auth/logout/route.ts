import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (token) await db()`delete from waitlist_sessions where token = ${token}`;
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 0 });
  return response;
}
