
import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import Logo from "@/components/shared/Logo";

import CopyrightYear from "../shared/CopyrightYear";

export default function Footer() {
  return (
    <footer className="bg-[#1e332b] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo light />

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
              A little corner for curious minds and passionate readers.
              Discover new stories, borrow your next favorite book,
              and make reading a part of your everyday life.
            </p>

            <div className="mt-6 flex gap-4 text-sm">
              <a href="https://github.com/" target="_blank"
                rel="noopener noreferrer" className="text-white/70 hover:text-white">
                GitHub ↗
              </a>

              <a href="https://www.instagram.com/" target="_blank"
                rel="noopener noreferrer" className="text-white/70 hover:text-white">
                Instagram ↗
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold">
              Explore
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-white/65">
              <Link href="/" className="hover:text-white">Home</Link>
              <Link href="/books" className="hover:text-white">All Books</Link>
              <Link href="/login" className="hover:text-white">Login</Link>
              <Link href="/register" className="hover:text-white">Register</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg font-semibold">
              Get in Touch
            </h3>

            <div className="mt-5 flex flex-col gap-4 text-sm text-white/65">
              <p className="flex items-center gap-3">
                <Mail size={17} />
                hello@booknook.com
              </p>

              <p className="flex items-center gap-3">
                <Phone size={17} />
                01770711100
              </p>

              <p className="flex items-center gap-3">
                <MapPin size={17} />
               Uttara, Dhaka
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/15 pt-6 text-xs text-white/50 sm:flex-row">
          <p>
            © <CopyrightYear/> BookNook. All rights reserved.
          </p>

          <a href="#" className="flex items-center gap-1 hover:text-white">
            Made for book lovers <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
