import { SiteFooter } from "../components/site-footer";
import Link from "next/link";
import Image from "next/image";

export const metadata = { title: "Privacy | Hlo" };

export default function PrivacyPage() {
  return <><main className="legal-page"><div className="legal-content"><Link className="legal-brand" href="/"><Image src="/hlo-mark.webp" width={38} height={38} alt="" priority />Hlo</Link><div className="legal-hero"><p className="section-label">PRIVACY</p><h1>Clear about your data.</h1><p className="legal-lede">This notice explains how HloApp uses personal data while you reserve a Hlo handle. Effective 18 September 2026.</p></div>
    <section><h2>What we collect</h2><p>We collect your email address, your chosen handle, account creation and verification timestamps, a short-lived verification code, and a session token used to keep you signed in.</p></section>
    <section><h2>Why we use it</h2><p>We use this information to send a sign-in code, reserve and protect your handle, maintain your session, prevent misuse, and operate the waitlist. We do not use your email for marketing through this waitlist.</p></section>
    <section><h2>How long we keep it</h2><p>Verification codes expire after 10 minutes. Sessions expire after 30 days. Your account record stays until you delete it, unless we need to retain limited information for a lawful purpose.</p></section>
    <section><h2>Deletion and control</h2><p>You can permanently delete your account from the signed-in handle page. We ask you to type your exact handle before deletion because this action removes your account, reservation, and active sessions and cannot be undone.</p></section>
    <section><h2>Service providers</h2><p>We use providers to deliver verification email and host the database and application. They process data only as needed to provide those services to us.</p></section>
    <section><h2>EU and EEA</h2><p>Depending on applicable law, you may have rights to request access, correction, erasure, restriction, objection, or a portable copy of data you provided. The GDPR describes access, erasure, and portability rights in Articles 15, 17, and 20. <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679" target="_blank" rel="noreferrer">Read the official GDPR text ↗</a></p></section>
    <section><h2>India</h2><p>Where the Digital Personal Data Protection Act, 2023 applies, you may request information about personal data and its processing, correction, erasure, grievance redressal, or nomination as provided by law. <a href="https://www.meity.gov.in/static/uploads/2024/02/Digital-Personal-Data-Protection-Act-2023-1.pdf" target="_blank" rel="noreferrer">Read the official DPDP Act ↗</a></p></section>
    <section><h2>Contact</h2><p>For a privacy request other than in-product deletion, email <a href="mailto:privacy@hloapp.com">privacy@hloapp.com</a>. We may need to verify your identity before acting on a request.</p></section>
    <section><h2>Changes</h2><p>We may update this notice as Hlo evolves. The effective date at the top will change when we do.</p></section>
  </div></main><SiteFooter /></>;
}
