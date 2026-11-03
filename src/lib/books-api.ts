
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
export async function createBook(
  bookData: {
    title: string;
    author: string;
    category: string;
    description: string;
    image: string;
    totalCopies: number;
  },
  accessToken: string
) {
  if (!CLIENT_API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  if (!accessToken) {
    throw new Error("Authentication token is required");
  }

  const response = await fetch(`${CLIENT_API_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(bookData),
  });

  const responseText = await response.text();

  let result;

  try {
    result = responseText ? JSON.parse(responseText) : {};
  } catch {
    console.error("Backend returned non-JSON response:", responseText);
    throw new Error(`Server error: HTTP ${response.status}`);
  }

  console.log("CREATE BOOK BACKEND RESPONSE:", {
    status: response.status,
    ok: response.ok,
    body: result,
  });

  if (!response.ok) {
    throw new Error(
      result.message ||
      result.error ||
      JSON.stringify(result) ||
      `Failed to create book (${response.status})`
    );
  }

  return result;
}
