import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Fredrick Kimutai",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "junior network engineer Dublin",
    "network technician Ireland",
    "CCNA",
    "Cisco",
    "MikroTik",
    "homelab",
    "IT support Dublin",
    "CCT College Dublin",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "./",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "Junior Network Engineer",
  address: { "@type": "PostalAddress", addressLocality: "Dublin", addressCountry: "IE" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "CCT College Dublin" },
  knowsAbout: ["Computer networking", "Cisco IOS", "VLANs", "OSPF", "MikroTik RouterOS", "Proxmox VE", "LibreNMS", "Linux"],
  sameAs: ["https://linkedin.com/in/kimutai-fredrick", "https://github.com/kkfred202"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-flash: apply saved theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
