import CallToAction from "@/components/home/CallToAction";
import FaqSection from "@/components/home/FaqSection";
import HeroSection from "@/components/home/HeroSection";
import LatestRecipe from "@/components/home/LatestRecipe";
import PopularCategories from "@/components/home/PopularCategories";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TopContributorsSection from "@/components/home/TopContributorsSection";
import VaultStats from "@/components/home/VaultStats";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between container mx-auto">
     <HeroSection />
     <PopularCategories/>
     <LatestRecipe/>
     <VaultStats/>
     <TopContributorsSection/>
     <TestimonialsSection/>
     <FaqSection />
     <CallToAction/>
    </div>
  );
}

export default Home;