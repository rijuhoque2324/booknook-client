
import Link from "next/link";
import { ArrowRight, Quote, Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah Ahmed",
    role: "Book Enthusiast",
    initials: "SA",
    rating: 5,
    review:
      "BookNook makes discovering new books so enjoyable. I love how easy it is to explore different categories and find my next read.",
  },
  {
    name: "Michael Rahman",
    role: "Regular Reader",
    initials: "MR",
    rating: 5,
    review:
      "A simple and beautiful library experience. The collection is easy to explore, and the borrowing process feels straightforward.",
  },
  {
    name: "Nusrat Jahan",
    role: "Student",
    initials: "NJ",
    rating: 5,
    review:
      "I enjoy having different types of books in one place. BookNook gives me a convenient way to discover books for learning and entertainment.",
  },
];

export default function ReaderReviews() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C49A53]">
            Words From Readers
          </span>

          <h2 className="mt-3 font-heading text-3xl font-bold text-[#244B3C] md:text-4xl">
            What Readers Say
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#737B74] md:text-base">
            Discover why a great reading experience makes all the difference.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.initials}
              className="relative rounded-2xl border border-[#E7E5DF] bg-[#FAF9F6] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Quote
                size={35}
                className="mb-5 text-[#C49A53]/70"
                fill="currentColor"
              />

              <div className="mb-5 flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className="fill-[#C49A53] text-[#C49A53]"
                  />
                ))}
              </div>

              <p className="min-h-28 text-sm leading-7 text-[#59635B]">
                “{review.review}”
              </p>

              <div className="mt-7 flex items-center gap-3 border-t border-[#E7E5DF] pt-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#244B3C] text-sm font-bold text-white">
                  {review.initials}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#252B27]">
                    {review.name}
                  </h3>

                  <p className="mt-1 text-xs text-[#737B74]">
                    {review.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 rounded-full bg-[#244B3C] px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#19392E]"
          >
            Start Your Reading Journey
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
