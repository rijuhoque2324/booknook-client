import type {
  Book,
  BooksResponse,
  BookResponse,
} from "@/types/book";

// Server-side API URL
const API_URL = process.env.API_URL;

// Client-side API URL
const CLIENT_API_URL = process.env.NEXT_PUBLIC_API_URL;

// GET all books
export async function getAllBooks(): Promise<Book[]> {
  if (!API_URL) {
    throw new Error("API_URL is not configured");
  }

  const response = await fetch(`${API_URL}/books`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch books");
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
    throw new Error("Failed to fetch book");
  }

  const result: BookResponse = await response.json();

  return result.data;
}

// POST create book
export async function createBook(bookData: {
  title: string;
  author: string;
  category: string;
  description: string;
  image: string;
  totalCopies: number;
}) {
  if (!CLIENT_API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const response = await fetch(`${CLIENT_API_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create book");
  }

  return result;
}