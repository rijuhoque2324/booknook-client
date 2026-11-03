import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/types/book";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-[#E7E5DF] bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/books/${book._id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-[#E9EEE8]">
          <Image
            src={book.image}
            alt={book.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="space-y-2 p-4">
          <span className="text-xs font-medium uppercase tracking-wider text-[#244B3C]">
            {book.category}
          </span>

          <h3 className="line-clamp-1 font-semibold text-[#252B27]">
            {book.title}
          </h3>

          <p className="text-sm text-gray-500">
            By {book.author}
          </p>

          <div className="flex items-center justify-between pt-2 text-sm">
            <span className="text-gray-500">
              {book.availableCopies > 0
                ? `${book.availableCopies} Available`
                : "Out of Stock"}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}