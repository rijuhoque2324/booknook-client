
"use client";

import dynamic from "next/dynamic";

const HeroSliderContent = dynamic(
  () => import("./HeroSliderContent"),
  {
    ssr: false,
    loading: () => (
      <section className="min-h-[520px] animate-pulse bg-[#172D25] md:min-h-[620px]" />
    ),
  }
);

export default function HeroSlider() {
  return <HeroSliderContent />;
}
