import HeroSlider from "@/components/home/HeroSlider";
import TopCategories from "@/components/home/TopCategories";
import NewArrivals from "@/components/home/NewArrivals";
import ReaderReviews from "@/components/home/ReaderReviews";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <TopCategories />
      <NewArrivals />
      <ReaderReviews />
    </div>
  );
}
