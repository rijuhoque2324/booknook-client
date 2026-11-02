
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "@/components/shared/Logo";

const publicLinks = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E7E5DF] bg-[#FAF9F6]/95 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 lg:flex">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                isActive(link.href)
                  ? "bg-[#E9EEE8] text-[#244B3C]"
                  : "text-[#737B74] hover:bg-[#E9EEE8] hover:text-[#244B3C]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="rounded-full px-5 py-3 text-sm font-semibold text-[#244B3C] hover:bg-[#E9EEE8]"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full bg-[#244B3C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#19392E]"
          >
            Register
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E7E5DF] text-[#244B3C] lg:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      <div
        id="mobile-navigation"
        className={`absolute left-0 right-0 top-full z-50 border-b border-[#E7E5DF] bg-[#FAF9F6] px-5 shadow-lg transition-all duration-300 lg:hidden ${
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 py-5">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              aria-current={isActive(link.href) ? "page" : undefined}
              tabIndex={menuOpen ? 0 : -1}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive(link.href)
                  ? "bg-[#E9EEE8] text-[#244B3C]"
                  : "text-[#737B74] hover:bg-[#E9EEE8]"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-3 grid grid-cols-2 gap-3 border-t border-[#E7E5DF] pt-4">
            <Link
              href="/login"
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
              className="rounded-full border border-[#244B3C] py-3 text-center text-sm font-semibold text-[#244B3C]"
            >
              Login
            </Link>

            <Link
              href="/register"
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
              className="flex items-center justify-center gap-2 rounded-full bg-[#244B3C] py-3 text-sm font-semibold text-white"
            >
              Register
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
