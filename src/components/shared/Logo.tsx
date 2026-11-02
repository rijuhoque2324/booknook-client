
import Link from "next/link";
import { BookOpen } from "lucide-react";

interface LogoProps {
  light?: boolean;
}

export default function Logo({ light = false }: LogoProps) {
  return (
    <Link
      href="/"
      className="inline-flex shrink-0 items-center gap-2.5"
      aria-label="BookNook Home"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#244B3C] text-white shadow-sm">
        <BookOpen size={25} strokeWidth={2} />
      </span>

      <span
        className={`font-heading text-2xl font-bold tracking-tight ${
          light ? "text-white" : "text-[#244B3C]"
        }`}
      >
        BookNook<span className="text-[#C49A53]">.</span>
      </span>
    </Link>
  );
}
