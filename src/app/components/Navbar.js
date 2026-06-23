"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/badhoshlogo.png";

const navLinks = [
  { label: "Performances", href: "/#performances" },
  { label: "Zines", href: "/zines" },
  { label: "Research", href: "/research" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-[#00000036] bg-white z-50">
      <div className=" mx-auto h-18 px-5 md:px-10 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="Badhosh" className="h-18 w-auto" />
        </Link>

        <button
          className="flex md:hidden flex-col justify-center gap-1.5 w-7 h-7"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`h-[1px] bg-black transition-all duration-300 ${
              menuOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[1px] bg-black transition-all duration-300 ${
              menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>

        <ul className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="uppercase text-[1rem] tracking-[0.12em] relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-black after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`fixed inset-x-0 top-15 z-50 bottom-0 bg-white flex flex-col items-center justify-center gap-10 transition-all duration-300 md:hidden ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="uppercase text-sm tracking-[0.12em]"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
