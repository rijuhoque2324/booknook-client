import Link from "next/link";
import { Suspense } from "react";

import { getAllBooks } from "@/lib/books-api";
import BookCard from "@/components/books/BookCard";

async function NewArrivalsContent() {
  const books = await getAllBooks();
  const latestBooks = books.slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#244B3C]">
            Fresh From Our Library
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#252B27]">
            New Arrivals
          </h2>
        </div>

        <Link
          href="/books"
          className="text-sm font-semibold text-[#244B3C] hover:underline"
        >
          View All Books →
        </Link>
      </div>

      {latestBooks.length === 0 ? (
        <p className="text-gray-500">No new books available.</p>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {latestBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
}

function NewArrivalsSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8">
        <div className="h-4 w-44 animate-pulse rounded bg-gray-200" />
        <div className="mt-3 h-9 w-52 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-[3/4] rounded-xl bg-gray-200" />
            <div className="mt-3 h-4 w-3/4 rounded bg-gray-200" />
            <div className="mt-2 h-3 w-1/2 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function NewArrivals() {
  return (
    <Suspense fallback={<NewArrivalsSkeleton />}>
      <NewArrivalsContent />
    </Suspense>
  );
}