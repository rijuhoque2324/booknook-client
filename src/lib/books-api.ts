import type {
  Book,
  BooksResponse,
  BookResponse,
} from "@/types/book";

const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error("API_URL is not configured");
}

// GET all books
export async function getAllBooks(): Promise<Book[]> {
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