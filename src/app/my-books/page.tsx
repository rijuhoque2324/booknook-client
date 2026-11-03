import { requireAuth } from "@/lib/auth-guard";
import MyBooks from "@/components/books/MyBooks";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Books",
  description: "Manage the books you have added to your library collection.",
};
export const instant = false;

export default async function MyBooksPage() {
  const session = await requireAuth();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#244B3C]">
          My Books
        </h1>

        <p className="mt-2 text-gray-600">
          Welcome, {session.user.name}. Manage the books you have added
          to the community library.
        </p>
      </div>

      <MyBooks userEmail={session.user.email} />
    </main>
  );
}