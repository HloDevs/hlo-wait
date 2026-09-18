"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteFooter } from "../components/site-footer";

function BrandPanel({ handle }: { handle: string }) {
  return <aside className="brand-panel"><Image className="brand-hero-art" src="/images/hero/home-left.webp" alt="" fill priority sizes="(max-width: 900px) 42vw, 50vw" /><div className="brand-hero-shade" /><Link className="brand brand-light" href="/"><Image src="/hlo-mark.webp" width={38} height={38} alt="" priority /><span>Hlo</span></Link><div className="brand-story"><div className="handle-preview claim-preview"><div className="preview-top"><span>RESERVED HANDLE</span><i /></div><div className="preview-name">@{handle || "yourname"}</div></div></div></aside>;
}

function LogoutIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4" /><path d="m14 8 4 4-4 4M18 12H9" /></svg>; }
function TrashIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6m4-6v6M9 7l1-3h4l1 3m-9 0 1 13h10l1-13" /></svg>; }

export default function HandlePage() {
  const router = useRouter();
  const [handle, setHandle] = useState(""); const [current, setCurrent] = useState<string | null>(null); const [status, setStatus] = useState(""); const [busy, setBusy] = useState(false); const [deleteOpen, setDeleteOpen] = useState(false); const [confirmation, setConfirmation] = useState(""); const [deleteError, setDeleteError] = useState("");

  useEffect(() => { fetch("/api/me").then(async response => { const data = await response.json(); if (!response.ok) router.replace("/"); else setCurrent(data.handle); }); }, [router]);
  const valid = /^[a-z0-9]{3,}$/.test(handle);

  async function claim(event: FormEvent) { event.preventDefault(); if (!valid) return; setBusy(true); setStatus(""); const response = await fetch("/api/handle", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ handle }) }); const data = await response.json(); setBusy(false); if (!response.ok) return setStatus(data.error); setCurrent(data.handle); }
  async function logout() { setBusy(true); await fetch("/api/auth/logout", { method: "POST" }); router.replace("/"); router.refresh(); }
  async function deleteAccount() { if (!current || confirmation !== current) return; setBusy(true); setDeleteError(""); const response = await fetch("/api/account", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ handle: confirmation }) }); const data = await response.json(); if (!response.ok) { setBusy(false); setDeleteError(data.error || "We could not delete your account."); return; } router.replace("/"); router.refresh(); }

  return <><main className="split-shell"><BrandPanel handle={handle || current || ""} /><section className="auth-panel">
    {current && <div className="account-actions" aria-label="Account actions"><button className="icon-button icon-button-danger" type="button" onClick={() => { setDeleteOpen(true); setConfirmation(""); setDeleteError(""); }} disabled={busy} aria-label="Delete account" title="Delete account"><TrashIcon /></button><button className="icon-button" type="button" onClick={logout} disabled={busy} aria-label="Log out" title="Log out"><LogoutIcon /></button></div>}
    <div className="auth-mobile-brand"><Image className="mobile-hero-art" src="/images/hero/home-left.webp" alt="" fill priority sizes="100vw" /><div className="mobile-brand-name"><Image src="/hlo-mark.webp" width={34} height={34} alt="" /><span>Hlo</span></div><div className="mobile-handle">hloapp.com/<b>yourname</b></div></div>
    <div className="auth-content">{current ? <><div className="check">✓</div><p className="section-label">RESERVED FOR YOU</p><h1>This name is yours.</h1><p className="auth-lede">You’re on the list. We’ll let you know the moment Hlo is ready.</p><div className="claimed-handle"><span>hloapp.com/</span>{current}</div></> : <><p className="section-label">CHOOSE YOUR HANDLE</p><h1>Make it yours.</h1><p className="auth-lede">This is how people will find you on Hlo.</p><form className="auth-form" onSubmit={claim}><label htmlFor="handle">Your Hlo handle</label><div className="handle-wrap"><span>hloapp.com/</span><input id="handle" autoFocus value={handle} onChange={event => setHandle(event.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))} placeholder="yourname" /></div><button className="action-button" disabled={!valid || busy}>{busy ? "Reserving…" : "Reserve handle"}<span>→</span></button></form><p className={handle && !valid ? "form-note form-invalid" : "form-note"}>{handle && !valid ? "Use at least 3 lowercase letters or numbers." : "At least 3 characters. Lowercase letters and numbers only."}</p></>}</div>{status && <p className="form-error">{status}</p>}
    {deleteOpen && current && <div className="delete-dialog-backdrop" role="presentation"><section className="delete-dialog" role="alertdialog" aria-modal="true" aria-labelledby="delete-title"><p className="section-label">PERMANENT ACTION</p><h2 id="delete-title">Delete @{current}?</h2><p>This permanently deletes your account, handle reservation, verification records, and active sessions. This cannot be undone.</p><label htmlFor="delete-confirmation">Type <strong>{current}</strong> to confirm</label><input id="delete-confirmation" value={confirmation} onChange={event => setConfirmation(event.target.value.toLowerCase())} autoCapitalize="none" autoCorrect="off" spellCheck="false" autoFocus /><div className="delete-dialog-actions"><button className="modal-cancel" type="button" onClick={() => setDeleteOpen(false)} disabled={busy}>Cancel</button><button className="delete-confirm" type="button" onClick={deleteAccount} disabled={busy || confirmation !== current}>{busy ? "Deleting…" : "Delete permanently"}</button></div>{deleteError && <p className="form-error">{deleteError}</p>}</section></div>}
  </section></main><SiteFooter /></>;
}
