import { SiteFooter } from "../components/site-footer";
import Link from "next/link";
import Image from "next/image";

export const metadata = { title: "Terms | Hlo" };

export default function TermsPage() {
  return <><main className="legal-page"><div className="legal-content"><Link className="legal-brand" href="/"><Image src="/hlo-mark.webp" width={38} height={38} alt="" priority />Hlo</Link><div className="legal-hero"><p className="section-label">TERMS</p><h1>Simple terms for a first place.</h1><p className="legal-lede">These terms govern use of the Hlo handle waitlist. Effective 18 September 2026.</p></div>
    <section><h2>The waitlist</h2><p>Hlo is in private beta. Reserving a handle records your interest and reserves that handle in the current waitlist experience. It does not guarantee a launch date, product access, or any particular feature.</p></section>
    <section><h2>Your handle</h2><p>Choose a handle that is lawful and does not impersonate another person or organization, infringe rights, or attempt to mislead others. We may refuse or reclaim a handle when reasonably necessary to protect people, the service, or the Hlo name.</p></section>
    <section><h2>Your account</h2><p>You are responsible for access to the email address used to sign in. Keep your verification code private. We may end a session or restrict access where we reasonably believe the service is being misused.</p></section>
    <section><h2>Availability</h2><p>The waitlist is provided as available. We may change, pause, or end it as the product develops. To the extent permitted by law, Hlo is not responsible for indirect or consequential loss arising from use of the waitlist.</p></section>
    <section><h2>Your choices</h2><p>You can sign out at any time. You can permanently delete your account from the signed-in handle page after typing your exact handle to confirm. See our <a href="/privacy">Privacy Notice</a> for how deletion and data requests work.</p></section>
    <section><h2>Changes to these terms</h2><p>We may update these terms as Hlo evolves. If you continue to use the waitlist after an update takes effect, the updated terms apply.</p></section>
    <section><h2>Contact</h2><p>Questions about these terms can be sent to <a href="mailto:legal@hloapp.com">legal@hloapp.com</a>.</p></section>
  </div></main><SiteFooter /></>;
}
