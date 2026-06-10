"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <Link href="/" className="nav-name" onClick={close}>
          Fredrick Kimutai
        </Link>

        {/* Desktop links */}
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/ccna">CCNA Labs</Link>
          <Link href="/saa">SAA Labs</Link>
          <Link href="/#projects">Projects</Link>
          <Link href="/#skills">Skills</Link>
          <Link href="/#contact">Contact</Link>
        </div>

        {/* Right side — theme toggle + hamburger */}
        <div className="nav-right">
          <ThemeToggle />
          <button
            className="nav-hamburger"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            <FontAwesomeIcon icon={open ? faXmark : faBars} width={18} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="nav-drawer" role="dialog" aria-label="Navigation menu">
          <button className="nav-drawer-close" onClick={close} aria-label="Close menu">
            <FontAwesomeIcon icon={faXmark} width={16} />
          </button>
          <Link href="/" onClick={close}>Home</Link>
          <Link href="/ccna" onClick={close}>CCNA Labs</Link>
          <Link href="/saa" onClick={close}>SAA Labs</Link>
          <Link href="/#projects" onClick={close}>Projects</Link>
          <Link href="/#skills" onClick={close}>Skills</Link>
          <Link href="/#contact" onClick={close}>Contact</Link>
        </div>
      )}
    </>
  );
}
