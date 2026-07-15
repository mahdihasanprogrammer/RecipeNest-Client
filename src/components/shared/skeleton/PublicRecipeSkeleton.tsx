

// ১. এটি একটি রেসপনসিভ সিঙ্গেল কার্ড স্কেলিটন
export const RecipeCardSkeleton = () => {
  return (
    <div className="bg-linear-to-b from-white/3 to-transparent border border-white/10 rounded-[1.8rem] p-4 space-y-4 animate-pulse relative overflow-hidden">
      {/* ইমেজ এরিয়া স্কেলিটন */}
      <div className="relative w-full aspect-4/3 bg-white/5 rounded-2xl overflow-hidden" />

      <div className="space-y-3 px-1">
        {/* ক্যুইজিন ও ডিফিকাল্টি ট্যাগ স্কেলিটন */}
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-white/10 rounded-full" />
          <div className="h-5 w-20 bg-white/10 rounded-full" />
        </div>

        {/* টাইটেল ও শর্ট ডেসক্রিপশন স্কেলিটন */}
        <div className="space-y-2">
          <div className="h-5 bg-white/10 rounded-lg w-5/6" />
          <div className="h-4 bg-white/5 rounded-lg w-2/3" />
        </div>

        {/* মেটা ইনফো স্কেলিটন */}
        <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-2">
          <div className="h-3.5 bg-white/5 rounded w-16" />
          <div className="h-3.5 bg-white/5 rounded w-12" />
        </div>
      </div>
    </div>
  );
};

// ২. মেইন রেসপনসিভ পেজ কন্টেইনার স্কেলিটন
const PublicRecipeSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-white relative overflow-hidden px-4 sm:px-6 lg:px-8 py-8">
      {/* 🔮 ব্যাকগ্রাউন্ড গ্লো স্কেলিটন */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/2 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-amber-500/1 rounded-full blur-[90px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* 👑 রেসপনসিভ হেডার বক্স স্কেলিটন (ফ্লেক্স-কল টু ফ্লেক্স-রো ম্যাচড) */}
        <div className="relative bg-linear-to-b from-white/3 to-transparent border border-white/10 backdrop-blur-xl rounded-[1.8rem] p-6 md:p-8 mb-8 overflow-hidden animate-pulse">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            {/* বামপাশ: টেক্সট এরিয়া */}
            <div className="space-y-2 w-full max-w-xl">
              <div className="h-4 bg-orange-500/20 border border-orange-500/10 rounded-full w-24" />
              <div className="h-7 bg-white/10 rounded-xl w-3/4" />
              <div className="h-3 bg-white/5 rounded-lg w-1/2" />
            </div>

            {/* ডানপাশ: জোড়া কাউন্টার বক্স */}
            <div className="h-14 w-44 bg-black/30 border border-white/5 rounded-2xl self-start sm:self-center shrink-0" />
          </div>
        </div>

        {/* 🔍 ফিল্টার এরিয়া স্কেলিটন */}
        <div className="h-12 bg-white/2 border border-white/5 rounded-2xl animate-pulse w-full" />

        {/* 🎴 রেসিপি কার্ড গ্রিড স্কেলিটন (আপনার ওরিজিনাল গ্রিড ব্রেকপয়েন্টের সাথে হুবহু মেলানো) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-4 mt-8">
          {Array.from({ length: count }).map((_, index) => (
            <RecipeCardSkeleton key={index} />
          ))}
        </div>

        {/* 📄 পেজিনেশন স্কেলিটন */}
        <div className="mt-12 flex justify-center border-t border-white/5 pt-8">
          <div className="h-9 w-64 bg-white/5 rounded-xl animate-pulse" />
        </div>
        
      </div>
    </div>
  );
};

export default PublicRecipeSkeleton;