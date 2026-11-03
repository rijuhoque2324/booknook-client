
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, CheckCircle2, LockKeyhole } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

interface BorrowBookProps {
  bookId: string;
  bookTitle: string;
  availableCopies: number;
  alreadyBorrowed: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function BorrowBook({
  bookId,
  bookTitle,
  availableCopies,
  alreadyBorrowed,
}: BorrowBookProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBorrow = async () => {
    if (loading) return;

    if (alreadyBorrowed) {
      toast.info("You have already borrowed this book.");
      return;
    }

    if (availableCopies < 1) {
      toast.error("This book is currently unavailable.");
      return;
    }

    if (!API_URL) {
      toast.error("API URL is not configured.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        toast.error("Please login again to borrow this book.");
        return;
      }

      const response = await fetch(`${API_URL}/borrows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify({ bookId }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          toast.info(
            result.message || "You have already borrowed this book."
          );
          router.refresh();
          return;
        }

        throw new Error(
          result.message || "Unable to borrow this book."
        );
      }

      toast.success("Book borrowed successfully!");

      router.push("/my-borrows");
    } catch (error) {
      console.error("BORROW ERROR:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const isDisabled =
    loading || availableCopies < 1 || alreadyBorrowed;

  return (
    <div className="mt-8 rounded-2xl border border-[#E7E5DF] bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-full bg-[#E9EEE8] p-3 text-[#244B3C]">
          <BookOpen size={22} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#252B27]">
            Borrow This Book
          </h2>

          <p className="text-sm text-gray-500">
            Add this book to your borrowed list.
          </p>
        </div>
      </div>

      <div className="mb-5 rounded-lg bg-gray-50 p-4">
        <p className="text-sm text-gray-500">
          Selected Book
        </p>

        <p className="mt-1 font-semibold text-[#252B27]">
          {bookTitle}
        </p>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Available Copies
        </span>

        <span className="font-bold text-[#244B3C]">
          {availableCopies}
        </span>
      </div>

      <div className="mb-6 flex items-start gap-2 text-sm text-gray-500">
        <CheckCircle2
          size={18}
          className="mt-0.5 shrink-0 text-[#244B3C]"
        />

        <p>
          Your borrowing date will be automatically recorded
          when your request is successfully processed.
        </p>
      </div>

      {alreadyBorrowed && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-yellow-50 p-3 text-sm text-yellow-800">
          <LockKeyhole size={17} />
          You have already borrowed this book. Return it before borrowing again.
        </div>
      )}

      <button
        type="button"
        onClick={handleBorrow}
        disabled={isDisabled}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#244B3C] px-6 py-3 font-semibold text-white transition hover:bg-[#19372B] disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {alreadyBorrowed
          ? "Already Borrowed"
          : loading
            ? "Processing..."
            : availableCopies < 1
              ? "Currently Unavailable"
              : "Confirm Borrow"}
      </button>
    </div>
  );
}
