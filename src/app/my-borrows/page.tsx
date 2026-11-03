
import type { Metadata } from "next";
import MyBorrowBook from "@/components/books/MyBorrowsBook";

export const metadata: Metadata = {
  title: "My Borrowed Books",
  description:
    "Manage your borrowed books and return them when you are done with BookNook.",
};

export default function MyBorrowsPage() {
  return <MyBorrowBook />;
}
