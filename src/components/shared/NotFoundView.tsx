
import Link from "next/link";
import { BookX, Home, ArrowLeft } from "lucide-react";

interface NotFoundViewProps {
  title?: string;
  message?: string;
  buttonText?: string;
  homeUrl?: string;
}

export default function NotFoundView({
  title = "Page Not Found",
  message = "Sorry, the page you are looking for does not exist or may have been moved.",
  buttonText = "Back to Home",
  homeUrl = "/",
}: NotFoundViewProps) {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-[#F7F8F5] px-4 py-12">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-lg sm:p-12">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#172D25]/10 text-[#172D25]">
          <BookX size={48} />
        </div>

        <p className="mb-2 text-7xl font-extrabold text-[#172D25]">
          404
        </p>

        <h1 className="mb-3 text-2xl font-bold text-gray-900">
          {title}
        </h1>

        <p className="mb-8 leading-7 text-gray-500">
          {message}
        </p>

        <Link
          href={homeUrl}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#172D25] px-6 py-3 font-semibold text-white transition hover:bg-[#254638]"
        >
          <ArrowLeft size={18} />
          {buttonText}
          <Home size={18} />
        </Link>
      </div>
    </section>
  );
}
