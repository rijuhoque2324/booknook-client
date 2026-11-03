
"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, BookOpen, X } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  image: string;
  totalCopies: number;
  availableCopies: number;
  ownerName: string;
  ownerEmail: string;
  createdAt: string;
}

interface MyBooksProps {
  userEmail: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function MyBooks({ userEmail }: MyBooksProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    image: "",
    totalCopies: 1,
  });

  // Fetch books added by the logged-in user
  const fetchMyBooks = async () => {
    try {
      setLoading(true);

      // Get JWT token from Better Auth
      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        throw new Error("Authentication token is missing.");
      }

      const response = await fetch(`${API_URL}/books/mine`, {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch books.");
      }

      const result = await response.json();

      setBooks(result.data ?? []);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load your books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBooks();
  }, [userEmail]);

  // Open edit form
  const handleEdit = (book: Book) => {
    setEditingBook(book);

    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      description: book.description,
      image: book.image,
      totalCopies: book.totalCopies,
    });
  };

  // Update book
  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editingBook) return;

    try {
      setSaving(true);

      const response = await fetch(
        `${API_URL}/books/${editingBook._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update book.");
      }

      toast.success("Book updated successfully!");
      setEditingBook(null);
      await fetchMyBooks();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };


// Delete book
const handleDelete = async (bookId: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this book?"
  );

  if (!confirmed) return;

  try {
    setDeletingId(bookId);

    // Get JWT token from Better Auth
    const { data, error } = await authClient.token();

    if (error || !data?.token) {
      throw new Error("Authentication required. Please login again.");
    }

    // Send DELETE request with JWT token
    const response = await fetch(`${API_URL}/books/${bookId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to delete book.");
    }

    toast.success("Book deleted successfully!");

    setBooks((previousBooks) =>
      previousBooks.filter((book) => book._id !== bookId)
    );

  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Something went wrong."
    );
  } finally {
    setDeletingId(null);
  }
};


  if (loading) {
    return (
      <div className="py-16 text-center text-gray-500">
        Loading your books...
      </div>
    );
  }

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">
          You have added <strong>{books.length}</strong> book(s).
        </p>
      </div>

      {books.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center">
          <BookOpen className="mx-auto mb-4 text-gray-400" size={42} />
          <h2 className="text-xl font-semibold">No books found</h2>
          <p className="mt-2 text-gray-500">
            You have not added any books yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <article
              key={book._id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              <img
                src={book.image}
                alt={book.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">
                <span className="text-sm font-medium text-[#244B3C]">
                  {book.category}
                </span>

                <h2 className="mt-2 text-xl font-bold text-gray-900">
                  {book.title}
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                  By {book.author}
                </p>

                <div className="mt-4 flex justify-between text-sm text-gray-600">
                  <span>Total: {book.totalCopies}</span>
                  <span>Available: {book.availableCopies}</span>
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => handleEdit(book)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#244B3C] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#19382D]"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(book._id)}
                    disabled={deletingId === book._id}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-100 disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                    {deletingId === book._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Edit Book Modal */}
      {editingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Edit Book</h2>

              <button
                type="button"
                onClick={() => setEditingBook(null)}
                className="rounded-full p-2 hover:bg-gray-100"
                aria-label="Close edit form"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Book Title
                </label>
                <input
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-[#244B3C]"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Author
                </label>
                <input
                  required
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-[#244B3C]"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Category
                </label>
                <input
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-[#244B3C]"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-[#244B3C]"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Image URL
                </label>
                <input
                  required
                  type="url"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-[#244B3C]"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Total Copies
                </label>
                <input
                  required
                  type="number"
                  min={1}
                  value={formData.totalCopies}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      totalCopies: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-[#244B3C]"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-lg bg-[#244B3C] px-5 py-3 font-semibold text-white hover:bg-[#19382D] disabled:opacity-50"
              >
                {saving ? "Saving..." : "Update Book"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
