"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import { motion, Variants } from "framer-motion";
import type { Swiper as SwiperType } from "swiper";

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";

// ১. স্লাইড ডাটার জন্য স্ট্রং ইন্টারফেস টাইপ ডিফাইন
interface SlideItem {
  tag: string;
  titleNormal: string;
  titleHighlight: string;
  desc: string;
  ctaText: string;
  ctaLink: string;
  imgSrc: string;
}

export default function Hero() {
  // ২. Swiper ইনস্ট্যান্সের জন্য সঠিক জেনেরিক টাইপ ব্যবহার
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const slidesData: SlideItem[] = [
    {
      tag: "Trending Recipes",
      titleNormal: "Discover the Art of Cookery & ",
      titleHighlight: "Flavors",
      desc: "Explore thousands of macro-balanced recipes, chef-curated culinary techniques, and seasonal dishes designed to elevate your home cooking.",
      ctaText: "Browse Recipes",
      ctaLink: "/recipes",
      imgSrc: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
    },
    {
      tag: "Meal Planning",
      titleNormal: "Track Your Daily Nutrition & ",
      titleHighlight: "Macros",
      desc: "Take control of your kitchen with automated calorie counting, custom grocery list generations, and structured meal roadmaps.",
      ctaText: "Plan Your Meals",
      ctaLink: "/dashboard/meal-planner",
      imgSrc: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop",
    },
    {
      tag: "Chef Space",
      titleNormal: "Create & Share Your Own ",
      titleHighlight: "Culinary Vault",
      desc: "Bookmark your favorite gourmet dishes, document your secret family kitchen formulas, and manage your kitchen dashboard in one place.",
      ctaText: "Go to Dashboard",
      ctaLink: "/dashboard/user",
      imgSrc: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
    }
  ];

  // ৩. Framer Motion ভ্যারিয়েন্টসের জন্য টাইপ সেফটি নিশ্চিতকরণ
  const leftTextVariants: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.2 } 
    }
  };

  const rightImageVariants: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.2 }
    }
  };

  return (
    <section className="relative w-full bg-[#0c0908] overflow-hidden pt-16 md:pt-24 pb-16 border-b border-white/5 px-4 sm:px-6 lg:px-8">
      
      {/* Background Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        onSwiper={(swiperInstance) => setSwiper(swiperInstance)} // টাইপ সেফ হ্যান্ডলার
        speed={600}
        pagination={{
          clickable: true,
          el: ".custom-swiper-pagination"
        }}
        className="w-full container mx-auto"
      >
        {slidesData.map((slide) => (
          // ৪. ইউনিক আইডেন্টিফায়ার বা স্লাইডের ইউনিক ডেটা দিয়ে key সেট করা
          <SwiperSlide key={slide.tag} className="w-full">
            {({ isActive }) => (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-112.5 overflow-hidden py-4">
                
                {/* ⬅️ Left Column: Text */}
                <motion.div 
                  className="lg:col-span-6 flex flex-col items-start text-left space-y-5 relative z-10"
                  initial="hidden"
                  animate={isActive ? "visible" : "hidden"}
                  variants={leftTextVariants}
                >
                  <span className="text-[10px] bg-orange-500/10 border border-orange-500/20 text-orange-400 px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                    {slide.tag}
                  </span>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                    {slide.titleNormal}
                    <span className="text-orange-400">{slide.titleHighlight}</span>
                  </h2>

                  <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-xl">
                    {slide.desc}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={slide.ctaLink}
                      className="inline-flex items-center gap-2 bg-linear-to-r from-orange-600 to-amber-600 text-white font-bold text-sm px-6 py-3 rounded-xl hover:opacity-95 shadow-lg shadow-orange-500/20 border border-white/10 group cursor-pointer transition-all active:scale-95"
                    >
                      <span>{slide.ctaText}</span>
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>

                {/* ➡️ Right Column: Image */}
                <div className="lg:col-span-6 w-full flex items-center justify-center relative">
                  <motion.div 
                    className="relative w-full aspect-[16/10] max-w-xl rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl p-2 flex items-center justify-center z-10"
                    initial="hidden"
                    animate={isActive ? "visible" : "hidden"}
                    variants={rightImageVariants}
                  >
                    <Image
                      src={slide.imgSrc}
                      alt={slide.titleNormal}
                      fill
                      className="object-cover rounded-2xl grayscale-[15%] contrast-[105%] hover:grayscale-0 transition-all duration-300"
                      sizes="(max-w-7xl) 50vw, 600px"
                      priority
                    />

                    {/* Slider Navigation Buttons */}
                    <div className="absolute bottom-4 left-0 right-0 z-20 flex items-center justify-center gap-3">
                      <button
                        type="button" // HTML সেফটি নিশ্চিত করতে টাইপ বাটন দেওয়া হলো
                        onClick={(e) => {
                          e.stopPropagation();
                          swiper?.slidePrev();
                        }}
                        className="w-9 h-9 rounded-xl bg-linear-to-r from-amber-500/20 to-orange-500/30 hover:from-orange-600 hover:to-amber-600 border border-orange-500/70 text-white flex items-center justify-center active:scale-95 transition-all shadow-xl backdrop-blur-md cursor-pointer"
                      >
                        <FiChevronLeft className="w-4 h-4" />
                      </button>
                      
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          swiper?.slideNext();
                        }}
                        className="w-9 h-9 rounded-xl bg-linear-to-r from-amber-500/20 to-orange-500/30 hover:from-orange-600 hover:to-amber-600 border border-orange-500/70 text-white flex items-center justify-center active:scale-95 transition-all shadow-xl backdrop-blur-md cursor-pointer"
                      >
                        <FiChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                </div>

              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Container */}
      <div className="custom-swiper-pagination flex justify-center gap-2 relative z-20" />

      {/* Global Theme Style Override */}
      <style jsx global>{`
        .custom-swiper-pagination .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.2) !important;
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          opacity: 1;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .custom-swiper-pagination .swiper-pagination-bullet-active {
          background: #ea580c !important;
          width: 20px !important;
          box-shadow: 0 0 10px rgba(234, 88, 12, 0.6);
        }
      `}</style>

    </section>
  );
}