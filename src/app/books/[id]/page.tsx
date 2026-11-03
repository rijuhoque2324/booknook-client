import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getBookById } from "@/lib/books-api";

interface BookDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BookDetailsPage({
  params,
}: BookDetailsPageProps) {
  const { id } = await params;

  let book;

  try {
    book = await getBookById(id);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "BOOK_NOT_FOUND"
    ) {
      notFound();
    }

    throw error;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <Link
        href="/books"
        className="mb-8 inline-block text-sm font-medium text-[#244B3C] hover:underline"
      >
        ← Back to All Books
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl bg-[#E9EEE8]">
          <Image
            src={book.image}
            alt={book.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#244B3C]">
            {book.category}
          </p>

          <h1 className="text-3xl font-bold text-[#252B27] md:text-4xl">
            {book.title}
          </h1>

          <p className="mt-3 text-lg text-gray-500">
            By {book.author}
          </p>

          <p className="mt-6 leading-8 text-gray-600">
            {book.description}
          </p>

          <div className="mt-8 space-y-4 border-t border-gray-200 pt-6">
            <div className="flex justify-between">
              <span className="text-gray-500">Total Copies</span>
              <span>{book.totalCopies}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Available Copies</span>
              <span className="font-semibold text-[#244B3C]">
                {book.availableCopies}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Added By</span>
              <span>{book.ownerName}</span>
            </div>
          </div>

          <button
            disabled={book.availableCopies === 0}
            className="mt-8 rounded-lg bg-[#244B3C] px-6 py-3 font-semibold text-white transition hover:bg-[#19372B] disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {book.availableCopies > 0
              ? "Borrow Book"
              : "Currently Unavailable"}
          </button>
        </div>
      </div>
    </main>
  );
}