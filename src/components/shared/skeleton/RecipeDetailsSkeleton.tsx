import React from "react";

const RecipeDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-white relative overflow-hidden px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-pulse">
      {/* 🔮 ব্যাকগ্রাউন্ড গ্লোয়িং লাইটস স্কেলিটন */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-amber-500/[0.01] rounded-full blur-[90px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10 space-y-8">
        
        {/* ⬅️ ব্যাক বাটন স্কেলিটন */}
        <div className="h-9 w-28 bg-white/5 border border-white/10 rounded-xl" />

        {/* 👑 মেইন হিরো সেকশন (ইমেজ এবং টাইটেল এরিয়া) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          
          {/* বামপাশ: বড় রেসিপি ইমেজ স্কেলিটন (১২ ভাগের ৭ ভাগ স্পেস) */}
          <div className="md:col-span-7 w-full aspect-[4/3] bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden" />

          {/* ডানপাশ: টাইটেল ও কুইক মেটা ইনফো (১২ ভাগের ৫ ভাগ স্পেস) */}
          <div className="md:col-span-5 space-y-5 flex flex-col justify-center h-full pt-2">
            <div className="space-y-3">
              {/* ক্যাটাগরি/ট্যাগ স্কেলিটন */}
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-orange-500/20 border border-orange-500/10 rounded-full" />
                <div className="h-5 w-24 bg-white/10 rounded-full" />
              </div>
              {/* রেসিপি মেইন টাইটেল */}
              <div className="h-8 bg-white/10 rounded-xl w-full" />
              <div className="h-8 bg-white/10 rounded-xl w-4/5" />
            </div>

            {/* ক্রিয়েটর প্রফাইল স্কেলিটন */}
            <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 p-3 rounded-2xl w-fit pr-8">
              <div className="w-10 h-10 bg-white/10 rounded-xl" />
              <div className="space-y-1.5">
                <div className="h-3 bg-white/10 rounded w-20" />
                <div className="h-2.5 bg-white/5 rounded w-28" />
              </div>
            </div>

            {/* টাইম, ক্যালোরি ও সার্ভিংস গ্রিড স্কেলিটন */}
            <div className="grid grid-cols-3 gap-3 bg-black/30 border border-white/5 p-3 rounded-[1.5rem]">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="text-center p-2 space-y-2">
                  <div className="h-3 bg-white/5 rounded w-10 mx-auto" />
                  <div className="h-5 bg-white/10 rounded w-14 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 📝 ডেসক্রিপশন বক্স স্কেলিটন */}
        <div className="bg-gradient-to-b from-white/[0.02] to-transparent border border-white/10 rounded-[1.8rem] p-6 space-y-3">
          <div className="h-4 bg-white/10 rounded w-32" />
          <div className="space-y-2 pt-1">
            <div className="h-3 bg-white/5 rounded w-full" />
            <div className="h-3 bg-white/5 rounded w-full" />
            <div className="h-3 bg-white/5 rounded w-2/3" />
          </div>
        </div>

        {/* 🧄 ইনগ্রেডিয়েন্টস এবং ইনস্ট্রাকশন গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mt-8">
          
          {/* ইনগ্রেডিয়েন্টস সেকশন (১২ ভাগের ৫ ভাগ স্পেস) */}
          <div className="md:col-span-5 bg-gradient-to-b from-white/[0.02] to-transparent border border-white/10 rounded-[1.8rem] p-6 space-y-4">
            <div className="h-4 bg-white/10 rounded w-40" />
            <div className="space-y-3 pt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-orange-500/20 rounded-full shrink-0" />
                  <div className="h-3.5 bg-white/5 rounded w-full" />
                </div>
              ))}
            </div>
          </div>

          {/* কুকিং ইনস্ট্রাকশন বা স্টেপস সেকশন (১২ ভাগের ৭ ভাগ স্পেস) */}
          <div className="md:col-span-7 bg-gradient-to-b from-white/[0.02] to-transparent border border-white/10 rounded-[1.8rem] p-6 space-y-5">
            <div className="h-4 bg-white/10 rounded w-44" />
            <div className="space-y-4 pt-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-7 h-7 bg-white/10 border border-white/10 rounded-lg flex-shrink-0" />
                  <div className="space-y-2 w-full pt-1">
                    <div className="h-3.5 bg-white/10 rounded w-1/3" />
                    <div className="h-3 bg-white/5 rounded w-full" />
                    <div className="h-3 bg-white/5 rounded w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default RecipeDetailsSkeleton;