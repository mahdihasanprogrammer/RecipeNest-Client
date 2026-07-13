import FaqSection from "@/components/home/FaqSection";
import HeroSection from "@/components/home/HeroSection";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between container mx-auto">
     <HeroSection />
     <FaqSection />
    </div>
  );
}

export default Home;