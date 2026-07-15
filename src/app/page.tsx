import FaqSection from "@/components/home/FaqSection";
import HeroSection from "@/components/home/HeroSection";
import LatestRecipe from "@/components/home/LatestRecipe";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between container mx-auto">
     <HeroSection />
     <LatestRecipe/>
     <FaqSection />
    </div>
  );
}

export default Home;