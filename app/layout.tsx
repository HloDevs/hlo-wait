import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hlo | Claim your handle",
  description: "Claim your place on Hlo.",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "any" }],
    shortcut: ["/favicon.png"],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
