
"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  {
    eyebrow: "WELCOME TO BOOKNOOK",
    title: "Discover Stories That Stay With You.",
    description:
      "Explore a world of knowledge, imagination, and inspiration. Find your next favorite book at BookNook.",
    button: "Explore Books",
    href: "/books",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1800&q=85",
  },
  {
    eyebrow: "A WORLD OF KNOWLEDGE",
    title: "Every Book Opens a New Door.",
    description:
      "From timeless classics to modern discoveries, find stories that inspire your next chapter.",
    button: "Browse Collection",
    href: "/books",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1800&q=85",
  },
  {
    eyebrow: "YOUR NEXT CHAPTER STARTS HERE",
    title: "Make Reading Your Everyday Habit.",
    description:
      "Build your reading journey with a library designed for curious minds and passionate readers.",
    button: "Start Exploring",
    href: "/books",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1800&q=85",
  },
];

export default function HeroSlider() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (typeof swiper.params.navigation !== "boolean") {
            swiper.params.navigation = {
              ...swiper.params.navigation,
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            };
          }
        }}
        className="booknook-hero"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.eyebrow}>
            <div
              className="relative flex min-h-[520px] items-center bg-cover bg-center md:min-h-[620px]"
              style={{ backgroundImage: `url("${slide.image}")` }}
              role="img"
              aria-label="BookNook library and reading atmosphere"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#172D25]/95 via-[#172D25]/75 to-[#172D25]/20" />

              <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 lg:px-8">
                <div className="max-w-2xl">
                  <span className="mb-6 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-[#E8C98F] backdrop-blur-sm">
                    {slide.eyebrow}
                  </span>

                  <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>

                  <p className="mt-6 max-w-xl text-base leading-8 text-white/80 md:text-lg">
                    {slide.description}
                  </p>

                  <Link
                    href={slide.href}
                    className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#C49A53] px-7 py-4 text-sm font-bold text-[#252B27] transition hover:-translate-y-1 hover:bg-[#D5AE6D]"
                  >
                    {slide.button}
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation */}
      <div className="absolute bottom-8 right-5 z-20 flex gap-3 lg:right-12">
        <button
          ref={prevRef}
          type="button"
          aria-label="Previous slide"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-[#244B3C]"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          ref={nextRef}
          type="button"
          aria-label="Next slide"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-[#244B3C]"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <style jsx global>{`
        .booknook-hero .swiper-pagination {
          bottom: 43px !important;
          left: 40px !important;
          width: auto !important;
          text-align: left;
        }

        .booknook-hero .swiper-pagination-bullet {
          width: 9px;
          height: 9px;
          background: white;
          opacity: 0.5;
        }

        .booknook-hero .swiper-pagination-bullet-active {
          width: 26px;
          border-radius: 10px;
          background: #c49a53;
          opacity: 1;
        }

        @media (max-width: 640px) {
          .booknook-hero .swiper-pagination {
            left: 20px !important;
            bottom: 25px !important;
          }
        }
      `}</style>
    </section>
  );
}
