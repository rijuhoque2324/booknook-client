
"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  CalendarDays,
  RotateCcw,
  LoaderCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface BorrowedBook {
  _id: string;
  borrowDate: string;
  returnedAt: string | null;
  status: "active" | "returned";
  book: {
    _id: string;
    title: string;
    author: string;
    image: string;
  } | null;
}

export default function MyBorrowsBook() {
  const [books, setBooks] = useState<BorrowedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState<string | null>(null);

  // Get authenticated user's JWT token
  const getToken = async () => {
    const result = await authClient.token();

    if (result.error || !result.data?.token) {
      return null;
    }

    return result.data.token;
  };

  // Fetch borrowed books
  const fetchBorrows = useCallback(async (showLoader = false) => {
    try {
      if (!API_URL) {
        throw new Error("API URL is not configured.");
      }

      if (showLoader) {
        setLoading(true);
      }

      const token = await getToken();

      if (!token) {
        toast.error("Please login to view your borrowed books.");
        return;
      }

      const response = await fetch(`${API_URL}/borrows`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load borrowed books."
        );
      }

      setBooks(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetching
  useEffect(() => {
    const loadBorrows = async () => {
      await fetchBorrows();
    };

    void loadBorrows();
  }, [fetchBorrows]);

  // Return borrowed book
  const handleReturn = async (id: string) => {
    try {
      if (!API_URL) {
        throw new Error("API URL is not configured.");
      }

      setReturningId(id);

      const token = await getToken();

      if (!token) {
        toast.error("Please login first.");
        return;
      }

      const response = await fetch(`${API_URL}/borrows/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not return the book."
        );
      }

      toast.success("Book returned successfully!");

      // Refresh data without showing the full-page loader
      await fetchBorrows();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setReturningId(null);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoaderCircle
          className="animate-spin text-[#244B3C]"
          size={36}
        />
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#244B3C]">
          My Borrowed Books
        </h1>

        <p className="mt-2 text-gray-600">
          Manage your borrowed books and return them when you are done.
        </p>
      </div>

      {books.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#D8DED7] bg-[#FAF9F6] px-6 py-16 text-center">
          <BookOpen
            size={48}
            className="mx-auto mb-4 text-[#244B3C]"
          />

          <h2 className="text-xl font-bold text-[#244B3C]">
            No Borrowed Books Yet
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            You have not borrowed any books yet. Explore our library.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((borrow) => (
            <div
              key={borrow._id}
              className="overflow-hidden rounded-2xl border border-[#E7E5DF] bg-white shadow-sm"
            >
              <div className="relative h-56 bg-[#F1F3EF]">
                {borrow.book?.image ? (
                  <Image
                    src={borrow.book.image}
                    alt={borrow.book.title}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <BookOpen
                      size={48}
                      className="text-gray-400"
                    />
                  </div>
                )}
              </div>

              <div className="p-5">
                <h2 className="text-lg font-bold text-[#244B3C]">
                  {borrow.book?.title || "Book unavailable"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  By {borrow.book?.author || "Unknown"}
                </p>

                <div className="mt-4 space-y-3 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <CalendarDays size={16} />

                    Borrowed:{" "}
                    {new Date(borrow.borrowDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      borrow.status === "returned"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {borrow.status === "returned"
                      ? "Returned"
                      : "Borrowed"}
                  </span>

                  {borrow.status === "active" && (
                    <button
                      type="button"
                      disabled={returningId === borrow._id}
                      onClick={() => handleReturn(borrow._id)}
                      className="flex items-center gap-2 rounded-full bg-[#244B3C] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#19392E] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {returningId === borrow._id ? (
                        <LoaderCircle
                          size={15}
                          className="animate-spin"
                        />
                      ) : (
                        <RotateCcw size={15} />
                      )}

                      {returningId === borrow._id
                        ? "Returning..."
                        : "Return Book"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

