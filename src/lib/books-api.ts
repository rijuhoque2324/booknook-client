
import type {
  Book,
  BooksResponse,
  BookResponse,
} from "@/types/book";

// Server-side API URL
const API_URL = (
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  ""
).replace(/\/+$/, "");

// Client-side API URL
const CLIENT_API_URL = (
  process.env.NEXT_PUBLIC_API_URL || ""
).replace(/\/+$/, "");

// GET all books
export async function getAllBooks(): Promise<Book[]> {
  if (!API_URL) {
    throw new Error("API_URL is not configured");
  }

  const response = await fetch(`${API_URL}/books`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch books: ${response.status}`
    );
  }

  const result: BooksResponse = await response.json();

  return result.data;
}

// GET single book
export async function getBookById(
  id: string
): Promise<Book> {
  if (!API_URL) {
    throw new Error("API_URL is not configured");
  }

  const response = await fetch(
    `${API_URL}/books/${encodeURIComponent(id)}`,
    {
      cache: "no-store",
    }
  );

  if (response.status === 404) {
    throw new Error("BOOK_NOT_FOUND");
  }

  if (!response.ok) {
    throw new Error(
      `Failed to fetch book: ${response.status}`
    );
  }

  const result: BookResponse = await response.json();

  return result.data;
}

// POST create book
interface CreateBookPayload {
  title: string;
  author: string;
  category: string;
  description: string;
  image: string;
  totalCopies: number;
}


export async function createBook(
  bookData: CreateBookPayload,
  accessToken: string
) {
  if (!CLIENT_API_URL) {
    throw new Error("API URL is not configured.");
  }

  if (!accessToken) {
    throw new Error("Authentication token is required.");
  }

  const response = await fetch(`${CLIENT_API_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(bookData),
  });

  const result = await response.json().catch(() => null);

  console.log("CREATE BOOK RESPONSE:", {
    status: response.status,
    result,
  });

  if (!response.ok) {
    const validationErrors = result?.errors
      ?.map(
        (error: { field?: string; message?: string }) =>
          `${error.field || "Field"}: ${error.message || "Invalid value"}`
      )
      .join("\n");

    throw new Error(
      validationErrors ||
        result?.message ||
        result?.error ||
        `Failed to create book. Status: ${response.status}`
    );
  }

  return result;
}