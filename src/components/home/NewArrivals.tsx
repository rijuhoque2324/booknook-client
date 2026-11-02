import Link from "next/link";

import { getAllBooks } from "@/lib/books-api";
import BookCard from "@/components/books/BookCard";

export default async function NewArrivals() {
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