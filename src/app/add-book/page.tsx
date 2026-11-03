import AddBookForm from "@/components/books/AddBookForm";

export default function AddBookPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-3 text-3xl font-bold">
        Add a New Book
      </h1>

      <p className="mb-8 text-gray-600">
        Add a new book to your library collection.
      </p>

      <AddBookForm />
    </main>
  );
}