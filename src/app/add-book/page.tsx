import AddBookForm from "@/components/books/AddBookForm";
import { requireAuth } from "@/lib/auth-guard";


import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Book",
  description: "Add a new book to your library collection.",
};

export const instant = false;

export default async function AddBookPage() {
  const session = await requireAuth();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-3 text-3xl font-bold">
        Add a New Book
      </h1>

      <p className="mb-8 text-gray-600">
        Welcome, {session.user.name || "Reader"}.
        Add a new book to your library collection.
      </p>

      <AddBookForm />
    </main>
  );
}
