import { requireAuth } from "@/lib/auth-guard";
import BorrowBook from "@/components/books/MyBorrowBook";

interface BorrowPageProps {
  searchParams: Promise<{
    id?: string;
  }>;
}

export default async function BorrowPage({
  searchParams,
}: BorrowPageProps) {
  await requireAuth();

  const { id } = await searchParams;

  if (!id) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#244B3C]">
          Book Not Selected
        </h1>
        <p className="mt-2 text-gray-500">
          Please select a book before borrowing.
        </p>
      </main>
    );
  }

  // TODO: Fetch the selected book from your Express API.

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <BorrowBook
        bookId={id}
        bookTitle="Selected Book"
        availableCopies={1}
      />
    </main>
  );
}