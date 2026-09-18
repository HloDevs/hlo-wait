import Image from "next/image";

const currentYear = new Date().getFullYear();

export function SiteFooter() {
  return <footer className="site-footer">
    <Image className="footer-art" src="/images/footer/hlo-footer.webp" alt="" fill sizes="100vw" />
    <div className="footer-shade" />
    <div className="footer-content">
      <div className="footer-intro"><div className="footer-hlo"><Image src="/favicon.png" width={46} height={46} alt="" /><span>Hlo</span></div><p>A name for what comes next.</p></div>
      <nav className="footer-links" aria-label="Follow Hlo"><p>Follow Hlo</p><a href="https://www.instagram.com/hlohq" target="_blank" rel="noreferrer">Instagram <span>↗</span></a><a href="https://www.facebook.com/HloApp/" target="_blank" rel="noreferrer">Facebook <span>↗</span></a><a href="https://x.com/HloHQ" target="_blank" rel="noreferrer">X <span>↗</span></a><a href="https://linkedin.com/company/hlo" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a></nav>
      <div className="footer-legal"><div className="footer-ownership"><span>© {currentYear} HloApp. All rights reserved. Hlo<sup>®</sup>, HloApp<sup>®</sup>, and Hlochat<sup>®</sup> are registered trademarks.</span></div><div><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div></div>
    </div>
  </footer>;
}
