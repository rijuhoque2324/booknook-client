
import Link from "next/link";
import {
  BookOpen,
  BookMarked,
  Heart,
  FlaskConical,
  GraduationCap,
  Globe,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  {
    name: "Fiction",
    description: "Stories that spark imagination",
    icon: BookOpen,
    color: "bg-[#E9EEE8]",
    iconColor: "text-[#244B3C]",
    slug: "fiction",
  },
  {
    name: "Non-Fiction",
    description: "Knowledge for real life",
    icon: BookMarked,
    color: "bg-[#F5EDE0]",
    iconColor: "text-[#A47735]",
    slug: "non-fiction",
  },
  {
    name: "Romance",
    description: "Stories of love and connection",
    icon: Heart,
    color: "bg-[#F6E8E8]",
    iconColor: "text-[#B65D68]",
    slug: "romance",
  },
  {
    name: "Science",
    description: "Explore the world of discovery",
    icon: FlaskConical,
    color: "bg-[#E8EDF5]",
    iconColor: "text-[#526F9A]",
    slug: "science",
  },
  {
    name: "Education",
    description: "Learn something new every day",
    icon: GraduationCap,
    color: "bg-[#F0EAF5]",
    iconColor: "text-[#82649A]",
    slug: "education",
  },
  {
    name: "History",
    description: "Discover stories from the past",
    icon: Globe,
    color: "bg-[#F3EDE4]",
    iconColor: "text-[#99734B]",
    slug: "history",
  },
];

export default function TopCategories() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C49A53]">
              Explore Collections
            </span>

            <h2 className="mt-3 font-heading text-3xl font-bold text-[#244B3C] md:text-4xl">
              Browse Top Categories
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#737B74] md:text-base">
              Find books that match your interests and discover something
              wonderful in every category.
            </p>
          </div>

          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#244B3C] transition hover:text-[#C49A53]"
          >
            View all books <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.slug}
                href={`/books?category=${category.slug}`}
                className="group flex items-center gap-5 rounded-2xl border border-[#E7E5DF] bg-[#FAF9F6] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#C49A53]/50 hover:shadow-lg"
              >
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${category.color}`}
                >
                  <Icon size={29} className={category.iconColor} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-heading text-xl font-bold text-[#252B27] transition group-hover:text-[#244B3C]">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#737B74]">
                    {category.description}
                  </p>
                </div>

                <ArrowUpRight
                  size={19}
                  className="shrink-0 text-[#A7ACA7] transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#C49A53]"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
