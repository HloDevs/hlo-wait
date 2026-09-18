"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteFooter } from "./components/site-footer";

type Step = "email" | "code" | "existing";
function BrandPanel() {
  return <aside className="brand-panel">
    <Image className="brand-hero-art" src="/images/hero/home-left.webp" alt="" fill priority sizes="(max-width: 900px) 42vw, 50vw" />
    <div className="brand-hero-shade" />
    <Link className="brand brand-light" href="/"><Image src="/hlo-mark.webp" width={38} height={38} alt="" priority /><span>Hlo</span></Link>
    <div className="brand-story"><div className="handle-preview claim-preview"><div className="preview-top"><span>RESERVED HANDLE</span><i /></div><div className="preview-name">@yourname</div></div></div>
  </aside>;
}

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email"); const [email, setEmail] = useState(""); const [code, setCode] = useState(""); const [handle, setHandle] = useState(""); const [message, setMessage] = useState(""); const [busy, setBusy] = useState(false); const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  const normalizedEmail = email.trim().toLowerCase(); const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
  useEffect(() => { fetch("/api/me").then(async response => { if (!response.ok) return; const account = await response.json(); if (account.handle) router.replace("/handle"); }).catch(() => undefined); }, [router]);
  async function sendCode(event: FormEvent) { event.preventDefault(); if (!emailValid) { setMessage("Enter a valid email address."); return; } setBusy(true); setMessage(""); const response = await fetch("/api/auth/send-code", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: normalizedEmail }) }); const data = await response.json(); setBusy(false); if (!response.ok) return setMessage(data.error || "Something went wrong. Try again."); if (data.status === "existing") { setHandle(data.handle); setStep("existing"); return; } setEmail(normalizedEmail); setStep("code"); }
  function setOtpDigit(index: number, value: string) { const digits = value.replace(/\D/g, ""); if (!digits) { setCode(previous => { const next = previous.padEnd(6, " ").split(""); next[index] = " "; return next.join(""); }); return; } setCode(previous => { const next = previous.padEnd(6, " ").split(""); digits.slice(0, 6 - index).split("").forEach((digit, offset) => { next[index + offset] = digit; }); return next.join(""); }); requestAnimationFrame(() => otpRefs.current[Math.min(index + digits.length, 5)]?.focus()); }
  async function verifyCode(event: FormEvent) { event.preventDefault(); setBusy(true); setMessage(""); const response = await fetch("/api/auth/verify-code", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, code: code.replace(/\s/g, "") }) }); const data = await response.json(); setBusy(false); if (!response.ok) return setMessage(data.error || "That code didn’t work. Try again."); router.push("/handle"); }
  return <><main className="split-shell"><BrandPanel /><section className="auth-panel"><div className="auth-mobile-brand"><Image className="mobile-hero-art" src="/images/hero/home-left.webp" alt="" fill priority sizes="100vw" /><div className="mobile-brand-name"><Image src="/hlo-mark.webp" width={34} height={34} alt="" /><span>Hlo</span></div><div className="mobile-handle">hloapp.com/<b>yourname</b></div></div><div className="auth-content">
    {step === "email" && <><h1>Reserve your<br />handle.</h1><p className="auth-lede">Start with your email. Then choose the name people will know you by.</p><form className="auth-form" onSubmit={sendCode} noValidate><label htmlFor="email">Email address</label><div className={`input-wrap${email && !emailValid ? " input-invalid" : ""}`}><svg className="mail-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.25" y="5" width="17.5" height="14" rx="3" /><path d="m4.5 7 7.5 5.5L19.5 7" /></svg><input id="email" type="email" autoComplete="email" autoCapitalize="none" autoCorrect="off" spellCheck="false" value={email} onChange={e => { setEmail(e.target.value); setMessage(""); }} onBlur={() => setEmail(normalizedEmail)} placeholder="you@example.com" aria-invalid={Boolean(email && !emailValid)} aria-describedby="email-note" required /></div><button className="action-button" disabled={busy || !emailValid}>{busy ? "Sending code…" : "Continue"}<span>→</span></button></form><p className={email && !emailValid ? "form-note form-invalid" : "form-note"} id="email-note" aria-live="polite">{email && !emailValid ? "Enter a valid email address." : "We’ll send a single verification code. No marketing mail."}</p></>}
    {step === "code" && <><p className="section-label">VERIFY YOUR EMAIL</p><h1>Check your inbox.</h1><p className="auth-lede">We sent a six-digit code to <strong>{email}</strong>.</p><form className="auth-form" onSubmit={verifyCode}><label id="code-label">Verification code</label><div className="otp-code" aria-labelledby="code-label">{Array.from({ length: 6 }, (_, index) => <input key={index} ref={element => { otpRefs.current[index] = element; }} className="otp-cell" aria-label={`Digit ${index + 1}`} inputMode="numeric" autoComplete={index === 0 ? "one-time-code" : "off"} maxLength={6} value={code[index] === " " ? "" : code[index] || ""} onChange={event => setOtpDigit(index, event.target.value)} onKeyDown={event => { if (event.key === "Backspace" && !code[index] && index > 0) otpRefs.current[index - 1]?.focus(); }} onPaste={event => { event.preventDefault(); setOtpDigit(index, event.clipboardData.getData("text")); }} />)}</div><button className="action-button" disabled={busy || code.replace(/\s/g, "").length !== 6}>{busy ? "Verifying…" : "Verify and continue"}<span>→</span></button></form><button className="subtle-button" onClick={() => setStep("email")}>Use a different email</button></>}
    {step === "existing" && <><div className="check">✓</div><p className="section-label">YOU’RE IN</p><h1>Your handle<br />is reserved.</h1><p className="auth-lede">Good choice. We’re holding this one for you.</p><div className="claimed-handle"><span>hloapp.com/</span>{handle}</div><p className="form-note">We’ll be in touch when it’s time to say hello.</p></>}
    {message && <p className="form-error">{message}</p>}
  </div></section></main><SiteFooter /></>;
}
