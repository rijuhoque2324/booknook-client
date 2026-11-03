"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  ArrowRight,
  LogOut,
  User,
} from "lucide-react";

import Logo from "@/components/shared/Logo";
import { useSession, signOut } from "@/lib/auth-client";

const publicLinks = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
];

const privateLinks = [
  { label: "Add Book", href: "/add-book" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/my-borrows" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const user = session?.user;
  const isLoggedIn = Boolean(user);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            closeMenu();
            router.push("/");
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const renderLink = (
    link: { label: string; href: string },
    mobile = false
  ) => (
    <Link
      key={link.href}
      href={link.href}
      onClick={mobile ? closeMenu : undefined}
      aria-current={isActive(link.href) ? "page" : undefined}
      tabIndex={mobile && !menuOpen ? -1 : 0}
      className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
        isActive(link.href)
          ? "bg-[#E9EEE8] text-[#244B3C]"
          : "text-[#737B74] hover:bg-[#E9EEE8] hover:text-[#244B3C]"
      }`}
    >
      {link.label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[#E7E5DF] bg-[#FAF9F6]/95 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 lg:flex">
          {publicLinks.map((link) => renderLink(link))}

          {!isPending &&
            isLoggedIn &&
            privateLinks.map((link) => renderLink(link))}
        </div>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 lg:flex">
          {isPending ? (
            <div className="h-10 w-24 animate-pulse rounded-full bg-gray-200" />
          ) : isLoggedIn ? (
            <>
              <div className="flex items-center gap-2 text-sm font-medium text-[#244B3C]">
                <User size={18} />
                <span className="max-w-32 truncate">
                  {user?.name || user?.email || "Reader"}
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-[#E7E5DF] px-5 py-3 text-sm font-semibold text-[#244B3C] transition hover:bg-[#E9EEE8]"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E7E5DF] text-[#244B3C] lg:hidden"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        aria-hidden={!menuOpen}
        className={`absolute left-0 right-0 top-full z-50 border-b border-[#E7E5DF] bg-[#FAF9F6] px-5 shadow-lg transition-all duration-300 lg:hidden ${
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 py-5">
          {publicLinks.map((link) => renderLink(link, true))}

          {isPending ? (
            <div className="mt-3 h-10 animate-pulse rounded-full bg-gray-200" />
          ) : isLoggedIn ? (
            <>
              {privateLinks.map((link) => renderLink(link, true))}

              <div className="mt-3 flex items-center gap-2 border-t border-[#E7E5DF] pt-4 text-sm text-[#244B3C]">
                <User size={18} />
                <span className="truncate">
                  {user?.name || user?.email || "Reader"}
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                tabIndex={menuOpen ? 0 : -1}
                className="mt-2 flex items-center justify-center gap-2 rounded-full border border-[#244B3C] py-3 text-sm font-semibold text-[#244B3C]"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
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
          )}
        </div>
      </div>
    </header>
  );
}