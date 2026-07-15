import FaqSection from "@/components/home/FaqSection";
import HeroSection from "@/components/home/HeroSection";
import LatestRecipe from "@/components/home/LatestRecipe";
import TopContributorsSection from "@/components/home/TopContributorsSection";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between container mx-auto">
     <HeroSection />
     <LatestRecipe/>
     <TopContributorsSection/>
     <FaqSection />
    </div>
  );
}

export default Home;