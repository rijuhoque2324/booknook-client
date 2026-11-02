
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

const books = [
  {
    id: "1",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    category: "Thriller",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=85",
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Development",
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&q=85",
  },
  {
    id: "3",
    title: "The Midnight Library",
    author: "Matt Haig",
    category: "Fiction",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=85",
  },
  {
    id: "4",
    title: "Educated",
    author: "Tara Westover",
    category: "Memoir",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=500&q=85",
  },
  {
    id: "5",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Finance",
    image:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500&q=85",
  },
  {
    id: "6",
    title: "Ikigai",
    author: "Héctor García",
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500&q=85",
  },
];

export default function NewArrivals() {
  return (
    <section className="bg-[#FAF9F6] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C49A53]">
              Fresh From Our Library
            </span>

            <h2 className="mt-3 font-heading text-3xl font-bold text-[#244B3C] md:text-4xl">
              New Arrivals
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#737B74] md:text-base">
              Take a look at the latest additions to our growing book
              collection.
            </p>
          </div>

          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#244B3C] transition hover:text-[#C49A53]"
          >
            Explore all books <ArrowRight size={17} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {books.map((book) => (
            <article
              key={book.id}
              className="group overflow-hidden rounded-2xl border border-[#E7E5DF] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Link
                href={`/books/${book.id}`}
                className="block"
                aria-label={`View ${book.title}`}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#E9EEE8]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url("${book.image}")` }}
                    role="img"
                    aria-label={`Cover image for ${book.title}`}
                  />

                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#244B3C] shadow-sm">
                    New
                  </span>
                </div>
              </Link>

              <div className="p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C49A53]">
                  {book.category}
                </span>

                <h3 className="mt-2 line-clamp-2 font-heading text-lg font-bold leading-snug text-[#252B27]">
                  {book.title}
                </h3>

                <p className="mt-2 truncate text-xs text-[#737B74]">
                  by {book.author}
                </p>

                <Link
                  href={`/books/${book.id}`}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#244B3C] py-2.5 text-xs font-bold text-[#244B3C] transition hover:bg-[#244B3C] hover:text-white"
                >
                  <BookOpen size={14} />
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
