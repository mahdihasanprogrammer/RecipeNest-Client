import FaqSection from "@/components/home/FaqSection";
import HeroSection from "@/components/home/HeroSection";
import LatestRecipe from "@/components/home/LatestRecipe";
import PopularCategories from "@/components/home/PopularCategories";
import TopContributorsSection from "@/components/home/TopContributorsSection";
import VaultStats from "@/components/home/VaultStats";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between container mx-auto">
     <HeroSection />
     <VaultStats/>
     <LatestRecipe/>
     <PopularCategories/>
     
     <TopContributorsSection/>
     <FaqSection />
    </div>
  );
}

export default Home;