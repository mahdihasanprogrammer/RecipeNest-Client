import { getTopContributors } from "@/lib/api/recipes";
import Image from "next/image";
import { FiMail, FiAward, FiUser } from "react-icons/fi";

interface TContributor {
  creatorId: string;
  creatorName: string;
  creatorEmail: string;
  creatorImage?: string;
  contribute: number;
}

const TopContributorsSection = async () => {
  const topContributors = (await getTopContributors()) as TContributor[];
  console.log(topContributors.length);

  return (
    <section className="py-12 relative overflow-hidden">
      {/* 🔮 ব্যাকগ্রাউন্ড সফট নিওন গ্লো */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-orange-500/2 rounded-full blur-[80px] pointer-events-none" />

      {/* 👑 স্লিক সেন্ট্রাল হেডার ডিজাইন */}
      <div className="relative border-b border-white/10 pb-6 mb-10 text-center flex flex-col items-center justify-center">
        <div className="space-y-2 max-w-2xl relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider text-orange-400 uppercase">
            🏆 Elite Chefs
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
            Top <span className="bg-linear-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Contributors</span>
          </h2>
          <p className="text-xs md:text-sm text-white/44 font-medium max-w-xl mx-auto">
            Meet the masterminds behind our most loved dishes. The community heroes who share the joy of cooking.
          </p>
        </div>
      </div>

      {/* 👥 কন্ট্রিবিউটর কার্ড গ্রিড (রেসপনসিভ লেআউট) */}
      {topContributors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-4">
          {topContributors.map((top, index) => {
            const hasValidImage = top.creatorImage && 
              top.creatorImage !== "" && 
              top.creatorImage !== "https://lh3.googleusercontent.com/a/ACg8ocJFekyzGcj6Yjn0dZmiag6sIPDwF6xiOanaKjGPbjNHcDf4JQ=s96-c";

            return (
              <div 
                key={top.creatorId} 
                className="bg-linear-to-b from-white/3 to-transparent border border-white/10 rounded-[1.8rem] p-5 flex flex-col items-center text-center relative overflow-hidden group hover:border-white/20 transition-all duration-300"
              >
                {/* 🥇 র্যাংক ব্যাজ টপ-রাইটে */}
                <div className="absolute top-4 right-4 bg-white/5 border border-white/10 px-2.5 py-1 rounded-xl text-[10px] font-black tracking-wider text-white/60 group-hover:text-orange-400 group-hover:border-orange-500/30 transition-colors">
                  #{index + 1}
                </div>

                {/* 📸 অ্যাভাটার সেকশন (ইমেজ না থাকলে ফার্স্ট লেটার ফ্যালব্যাক) */}
                <div className="w-20 h-20 rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center relative mb-4 shadow-xl group-hover:scale-105 transition-transform duration-300">
                  {hasValidImage ? (
                    <Image
                      src={top.creatorImage!}
                      alt={top.creatorName}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-2xl font-black bg-linear-to-br from-orange-400 to-amber-500 bg-clip-text text-transparent uppercase">
                      {top.creatorName ? top.creatorName[0] : "C"}
                    </span>
                  )}
                </div>

                {/* ℹ️ ইনফরমেশন এরিয়া */}
                <div className="space-y-1 w-full">
                  <h4 className="text-lg font-black text-white truncate px-2 flex items-center justify-center gap-1.5">
                    <FiUser className="w-4 h-4 text-white/30 shrink-0" />
                    {top.creatorName}
                  </h4>
                  <p className="text-xs text-white/40 font-medium truncate px-4 flex items-center justify-center gap-1.5">
                    <FiMail className="w-3.5 h-3.5 shrink-0" />
                    {top.creatorEmail}
                  </p>
                </div>

                {/* 📊 রেসিপি কাউন্টার মেটালিক ব্যাজ */}
                <div className="mt-5 w-full bg-black/30 border border-white/5 p-2 rounded-xl flex items-center justify-center gap-2 shadow-inner">
                  <FiAward className="text-orange-400 w-4 h-4" />
                  <span className="text-xs font-bold text-white/70">
                    <strong className="text-sm font-black text-orange-400 tracking-wide">{top.contribute}</strong> {top.contribute === 1 ? "Recipe" : "Recipes"} shared
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ফ্যালব্যাক এম্পটি স্টেট */
        <div className="text-center py-10 border border-dashed border-white/10 rounded-[1.8rem] bg-white/1">
          <p className="text-white/40 text-sm font-medium">No contributors found yet.</p>
        </div>
      )}
    </section>
  );
};

export default TopContributorsSection;