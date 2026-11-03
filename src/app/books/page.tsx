
import { Suspense } from "react";
import Link from "next/link";
import { getAllBooks } from "@/lib/books-api";
import BookCard from "@/components/books/BookCard";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Books",
  description: "Explore all available books in BookNook.",
};

type BooksSearchParams = Promise<{
  category?: string | string[];
}>;

async function BooksContent({
  searchParams,
}: {
  searchParams: BooksSearchParams;
}) {
  const { category: rawCategory } = await searchParams;

  // The API rejects categories longer than 50 characters.
  const category = (
    Array.isArray(rawCategory) ? rawCategory[0] : rawCategory
  )
    ?.trim()
    .slice(0, 50);

  const books = await getAllBooks(category);

  const categoryLabel =
    books[0]?.category ?? category?.replace(/-/g, " ");

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4 text-sm text-gray-500">
        <p>
          Showing {books.length} books
          {category ? ` in ${categoryLabel}` : ""}
        </p>

        {category && (
          <Link
            href="/books"
            className="font-semibold text-[#244B3C] hover:underline"
          >
            View all books
          </Link>
        )}
      </div>

      {books.length === 0 ? (
        <p className="py-16 text-center text-gray-500">
          {category
            ? `No books found in ${categoryLabel}.`
            : "No books available right now."}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </>
  );
}

function BooksLoading() {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="h-72 animate-pulse rounded-xl bg-gray-100"
        />
      ))}
    </div>
  );
}

export default function BooksPage({
  searchParams,
}: {
  searchParams: BooksSearchParams;
}) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#244B3C]">
          Explore Our Collection
        </p>

        <h1 className="text-3xl font-bold text-[#252B27] md:text-4xl">
          All Books
        </h1>

        <p className="mt-3 text-gray-500">
          Discover your next favorite book from our library.
        </p>
      </div>

      <Suspense fallback={<BooksLoading />}>
        <BooksContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
