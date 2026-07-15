import { getLatestRecipe } from "@/lib/api/recipes";
import { TRecipe } from "@/types/interface";
import RecipeCard from "../shared/RecipeCard";

const LatestRecipe = async () => {
  const latestRecipes = (await getLatestRecipe()) as TRecipe[];


  return (
    <div className="py-8 relative overflow-hidden">
      {/* 🔮 ব্যাকগ্রাউন্ড সফট নিওন গ্লো */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-orange-500/2 rounded-full blur-[80px] pointer-events-none" />

      {/* 👑 স্লিক, সেন্ট্রাল ও লার্জার হেডার ডিজাইন */}
      <div className="relative border-b border-white/10 pb-6 mb-8 overflow-hidden group text-center flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-linear-to-b from-orange-500/5 to-transparent rounded-full blur-2xl opacity-30 pointer-events-none" />
        
        <div className="space-y-2 max-w-2xl relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider text-orange-400 uppercase">
            🔥 Freshly Brewed
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
            Latest <span className="bg-linear-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Culinary Creations</span>
          </h2>
          <p className="text-xs md:text-sm text-white/44 font-medium max-w-xl mx-auto">
            Hot off the stove! Explore the newest and most trending recipes updated just now by our expert chefs.
          </p>
        </div>
      </div>

      {/* 🎴 রেসিপি কার্ড গ্রিড লেআউট */}
      {latestRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 mx-auto">
          {latestRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      ) : (
        /* ফ্যালব্যাক এম্পটি স্টেট */
        <div className="text-center py-10 border border-dashed border-white/10 rounded-[1.8rem] bg-white/1">
          <p className="text-white/40 text-sm font-medium">No new recipes posted recently.</p>
        </div>
      )}
    </div>
  );
};

export default LatestRecipe;