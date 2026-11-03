export interface Book {
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
  updatedAt: string;
}

export interface BooksResponse {
  success: boolean;
  message: string;
  data: Book[];
}

export interface BookResponse {
  success: boolean;
  message: string;
  data: Book;
}