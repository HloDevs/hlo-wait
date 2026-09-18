import { NextResponse } from "next/server"; import { accountFromSession } from "@/lib/auth";
export async function GET() { const account = await accountFromSession(); return account ? NextResponse.json({ handle: account.handle, email: account.email }) : NextResponse.json({ error: "Sign in to continue." }, { status: 401 }); }
