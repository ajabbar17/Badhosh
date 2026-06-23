import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/badhoshlogo.png";

const footerLinks = [
  { label: "Performances", href: "/#performances" },
  { label: "Zines", href: "/zines" },
  { label: "Research", href: "/research" },
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Whatsapp", href: "#" },
  { label: "Mail", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-15 pb-10">
      <div className="max-w-300 mx-auto px-10 max-md:px-5">
        <div className="flex items-center justify-between pb-10 max-md:flex-col max-md:gap-6 max-md:text-center">
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="Badhosh" className="h-20 w-auto brightness-0 invert" />
          </Link>
          <ul className="flex gap-8 list-none m-0 p-0 max-md:flex-wrap max-md:justify-center max-md:gap-5">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-xs tracking-[0.1em] uppercase text-(--gray-400) no-underline transition-colors duration-300 hover:text-white hover:opacity-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <hr className="w-full h-px bg-(--gray-600) border-none m-0" />

        <div className="flex items-center justify-between pt-7.5 max-md:flex-col max-md:gap-4 max-md:text-center">
          <p className="text-xs text-(--gray-400) tracking-[0.05em]">
            © {new Date().getFullYear()} All Rights Reserved
          </p>
          <ul className="flex gap-6 list-none m-0 p-0 max-md:justify-center">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-xs tracking-[0.08em] uppercase text-(--gray-400) no-underline transition-colors duration-300 hover:text-white hover:opacity-100"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
