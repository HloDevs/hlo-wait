import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import { db } from "./db";
import { validateHandle } from "./handles";

export const SESSION_COOKIE = "hlo_waitlist_session";
export const emailIsValid = (email: string) => /^\S+@\S+\.\S+$/.test(email);
export const handleIsValid = (handle: string) => validateHandle(handle).isValid;
export { validateHandle };
export const token = () => randomBytes(32).toString("base64url");

export async function accountFromSession() {
  const session = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!session) return null;
  const rows = await db()`select a.id, a.handle, a.email from waitlist_sessions s join waitlist_accounts a on a.id = s.account_id where s.token = ${session} and s.expires_at > now() limit 1`;
  return rows[0] as { id: string; handle: string | null; email: string } | undefined;
}
