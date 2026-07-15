import React from 'react';
import Image from 'next/image';
import { Avatar, Chip } from "@heroui/react";
import { FiClock, FiUsers, FiGlobe, FiTrendingUp, FiCheckCircle, FiChevronRight, FiUser, FiMail, FiCalendar } from "react-icons/fi";

import { TRecipe } from '@/types/interface';
import { getRecipeById } from '@/lib/api/recipes';

// ডিফিকাল্টি ভিত্তিক কালার থিম
const difficultyColors: Record<string, "success" | "warning" | "danger" | "default"> = {
  easy: "success",
  medium: "warning",
  hard: "danger",
};

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

const RecipeDetailsPage = async ({ params }: PageProps) => {

  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const recipe = await getRecipeById(id as string) ; 
  console.log(recipe, 'get recipe')

  const difficultyLower = recipe.difficulty?.toLowerCase() || "easy";
  const diffColor = difficultyColors[difficultyLower] || "default";

  // ডেট ফরম্যাটিং
  const formattedDate = new Date(recipe.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white relative overflow-hidden px-4 sm:px-6 lg:px-8 py-10">
      {/* 🔮 অ্যাম্বিয়েন্ট ব্যাকগ্রাউন্ড নিওন গ্লো */}
      <div className="absolute top-0 right-1/4 w-150 h-150 bg-orange-500/2 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-125 h-125bg-amber-500/2 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        
        {/* 📸 ১. সিনেমাটিক হিরো ব্যানার (কভার ইমেজ এবং কোর টাইটেল) */}
        <div className="relative w-full h-80 md:h-112.5 rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
          {recipe.coverImage && (
            <Image
              src={recipe.coverImage}
              alt={recipe.title}
              fill
              priority
              className="object-cover"
            />
          )}
          {/* গ্লাস গ্রেডিয়েন্ট ওভারলে */}
          <div className="absolute inset-0 bg-linear-to-t from-[#0B0C10] via-[#0B0C10]/40 to-black/20 z-10" />

          {/* ইমেজের ওপরে টাইটেল এবং ইনফো */}
          <div className="absolute bottom-0 inset-x-0 p-6 md:p-10 z-20 space-y-4">
            <div className="flex flex-wrap gap-3">
              <Chip size="sm" className="bg-orange-500/20 backdrop-blur-md border border-orange-500/30 text-orange-400 font-bold tracking-wide uppercase">
                <div className="flex items-center gap-1">
                  <FiGlobe /> {recipe.cuisine}
                </div>
              </Chip>
              <Chip size="sm" color={diffColor} variant="flat" className="font-extrabold uppercase border border-current/10">
                <div className="flex items-center gap-1">
                  <FiTrendingUp /> {recipe.difficulty}
                </div>
              </Chip>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
              {recipe.title}
            </h1>
            <p className="text-sm md:text-base text-white/70 max-w-2xl font-medium italic">
              {recipe.shortDesc}
            </p>
          </div>
        </div>

        {/* 📊 ২. কুইক মেটালিক স্ট্যাটাস বার */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-linear-to-b from-white/3 to-transparent border border-white/10 backdrop-blur-xl rounded-3xl p-5 mt-6 shadow-xl">
          <div className="flex items-center gap-3 justify-center border-r border-white/5 py-2">
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <FiClock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-white/30 font-bold uppercase tracking-wider block">Cook Time</span>
              <span className="text-base font-black text-white">{recipe.cookTime} Mins</span>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:border-r border-white/5 py-2">
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <FiUsers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-white/30 font-bold uppercase tracking-wider block">Servings</span>
              <span className="text-base font-black text-white">{recipe.servings} People</span>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center col-span-2 md:col-span-1 border-t md:border-t-0 border-white/5 pt-4 md:pt-0 py-2">
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <FiCalendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-white/30 font-bold uppercase tracking-wider block">Published On</span>
              <span className="text-sm font-black text-white/80">{formattedDate}</span>
            </div>
          </div>
        </div>

        {/* 📚 ৩. কোর কন্টেন্ট স্প্লিট লেআউট (ইনগ্রেডিয়েন্টস এবং প্রিপারেশন স্টেপস) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          
          {/* বামপাশে: ইনগ্রেডিয়েন্টস লিস্ট (১ কলাম) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/2 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md">
              <h3 className="text-lg font-extrabold text-white tracking-wide border-b border-white/5 pb-3 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-orange-500" />
                Ingredients
              </h3>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/70 font-medium group">
                    <FiCheckCircle className="text-orange-400 w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                    <span className="capitalize group-hover:text-white transition-colors">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ৪. রেসিপি ফুল ডেসক্রিপশন */}
            <div className="bg-linear-to-br from-white/2 to-transparent border border-white/5 rounded-[2rem] p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-2">Chef&apos;s Notes</h3>
              <p className="text-xs text-white/50 leading-relaxed font-medium">
                {recipe.fullDesc}
              </p>
            </div>
          </div>

          {/* ডানপাশে: প্রিপারেশন ডিরেকশন বা স্টেপস (২ কলাম) */}
          <div className="lg:col-span-2 bg-white/2 border border-white/10 rounded-[2rem] p-6 md:p-8 backdrop-blur-md">
            <h3 className="text-lg font-extrabold text-white tracking-wide border-b border-white/5 pb-3 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-amber-500" />
              Preparation Steps
            </h3>
            
            <div className="space-y-6">
              {recipe.steps.map((step, index) => (
                <div key={index} className="flex gap-4 group">
                  {/* স্টেপ নাম্বার বাবল */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-8 h-8 rounded-xl bg-linear-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center font-black text-xs shadow-lg shadow-orange-500/10 group-hover:scale-105 transition-transform">
                      {index + 1}
                    </div>
                    {index !== recipe.steps.length - 1 && (
                      <div className="w-0.5 h-full bg-linear-to-b from-orange-500/20 to-transparent my-2" />
                    )}
                  </div>
                  
                  {/* স্টেপ ডিটেইলস */}
                  <div className="bg-white/1 border border-white/5 rounded-2xl p-4 flex-1 group-hover:bg-white/3 group-hover:border-white/10 transition-all duration-300">
                    <p className="text-sm text-white/80 leading-relaxed font-medium">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 👑 ৫. প্রিমিয়াম শেফ ক্রিয়েটর প্রোফাইল এরিয়া */}
        <div className="mt-10 bg-linear-to-r from-white/3 via-white/1 to-transparent border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-60 h-60 bg-linear-to-bl from-orange-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            {/* কাস্টম HeroUI Avatar Anatomy */}
            <Avatar className="w-16 h-16 rounded-2xl border border-white/10 bg-white/5 font-bold text-white text-lg overflow-hidden shrink-0 shadow-xl">
              {recipe.creatorImage && recipe.creatorImage !== "https://lh3.googleusercontent.com/a/ACg8ocJFekyzGcj6Yjn0dZmiag6sIPDwF6xiOanaKjGPbjNHcDf4JQ=s96-c" ? (
                <Avatar.Image src={recipe.creatorImage} alt={recipe.creatorName} className="object-cover" />
              ) : null}
              <Avatar.Fallback className="bg-linear-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center w-full h-full uppercase text-xl font-black">
                {recipe.creatorName ? recipe.creatorName[0] : "C"}
              </Avatar.Fallback>
            </Avatar>
            
            <div className="space-y-1">
              <span className="text-[10px] bg-orange-500/10 border border-orange-500/20 text-orange-400 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
                Verified Creator
              </span>
              <h4 className="text-lg font-black text-white flex items-center gap-1.5 justify-center sm:justify-start">
                <FiUser className="w-4 h-4 text-white/40" /> {recipe.creatorName}
              </h4>
              <p className="text-xs text-white/40 font-medium flex items-center gap-1.5 justify-center sm:justify-start">
                <FiMail className="w-3.5 h-3.5" /> {recipe.creatorEmail}
              </p>
            </div>
          </div>

          <div className="text-[10px] text-white/20 font-mono bg-black/30 border border-white/5 px-3 py-1.5 rounded-xl self-center sm:self-end">
            ID: {recipe.creatorId}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RecipeDetailsPage;