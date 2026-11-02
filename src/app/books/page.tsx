import { getAllBooks } from "@/lib/books-api";
import BookCard from "@/components/books/BookCard";

export default async function BooksPage() {
  const books = await getAllBooks();

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

      <p className="mb-6 text-sm text-gray-500">
        Showing {books.length} books
      </p>

      {books.length === 0 ? (
        <p className="py-16 text-center text-gray-500">
          No books available right now.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </main>
  );
}