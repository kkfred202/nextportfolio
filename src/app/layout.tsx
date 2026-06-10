import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Fredrick Kimutai — Network & Cloud Engineer",
    template: "%s | Fredrick Kimutai",
  },
  description:
    "3rd-year BSc Computing & IT student at CCT College Dublin. Specialising in networking, cloud infrastructure, and systems administration. Working towards CCNA and AWS Solutions Architect.",
  keywords: ["network engineer", "CCNA", "AWS", "Dublin", "CCT College", "cloud infrastructure"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Anti-flash: apply saved theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
