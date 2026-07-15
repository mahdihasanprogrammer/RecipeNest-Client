import FilteredRecipe from "@/components/recipes/FilteredRecipe";
import { PaginationPage } from "@/components/recipes/PaginationPage";
import RecipeCard from "@/components/shared/RecipeCard";
import { getAllRecipes } from "@/lib/api/recipes";
import { TRecipe } from "@/types/interface";
import { FiGrid, FiLayers } from "react-icons/fi";

const ExploreRecipesPage = async ({ searchParams }: { searchParams: unknown }) => {
  const params = (await searchParams) as string;

  const queryParams = new URLSearchParams(params);
  const queryStr = queryParams.toString();

  const { recipes, totalRecipe } = (await getAllRecipes(queryStr)) as {
    recipes: TRecipe[];
    totalRecipe: number;
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white relative overflow-hidden px-4 sm:px-6 lg:px-8 py-8">
      {/* 🔮 ব্যাকগ্রাউন্ড গ্লোয়িং লাইটস */}
      <div className="absolute top-0 left-1/4 w-100 h-100 bg-orange-500/2 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-75h-75 bg-amber-500/1 rounded-full blur-[90px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* 👑 স্লিক ও কমপ্যাক্ট হেডার সেকশন */}
        <div className="relative bg-linear-to-b from-white/3 to-transparent border border-white/10 backdrop-blur-xl rounded-[1.8rem] p-6 md:p-8 shadow-2xl mb-8 overflow-hidden group">
          <div className="absolute top-0 right-0 w-72 h-72 bg-linear-to-br from-orange-500/5 to-transparent rounded-full blur-2xl opacity-50" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            {/* বামপাশ: স্লিম টাইটেল ও সাবটাইটেল */}
            <div className="space-y-1.5 max-w-xl">
              <div className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider text-orange-400 uppercase">
                ✨ Recipe Vault
              </div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight bg-linear-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                Discover Your Next <span className="bg-linear-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Culinary Obsession</span>
              </h1>
              <p className="text-xs text-white/40 font-medium">
                Dive into a curated universe of flavors. Use our advanced filters below.
              </p>
            </div>

            {/* ডানপাশ: স্লিম জোড়া কাউন্টার */}
            <div className="flex items-center gap-3 bg-black/30 border border-white/5 p-2.5 rounded-2xl backdrop-blur-md self-start sm:self-center shadow-inner shrink-0">
              
              {/* ডাটাবেজের টোটাল কাউন্ট */}
              <div className="px-3 py-1 text-center border-r border-white/10">
                <span className="text-[9px] text-white/30 font-bold uppercase tracking-widest block mb-0.5">Total Vault</span>
                <div className="flex items-center justify-center gap-1.5">
                  <FiLayers className="text-orange-400 w-3.5 h-3.5" />
                  <span className="text-xl font-black bg-linear-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent tracking-tight">
                    {totalRecipe}
                  </span>
                </div>
              </div>

              {/* কারেন্ট পেজের কাউন্ট */}
              <div className="px-3 py-1 text-center">
                <span className="text-[9px] text-white/30 font-bold uppercase tracking-widest block mb-0.5">Showing</span>
                <div className="flex items-center justify-center gap-1.5">
                  <FiGrid className="text-white/40 w-3.5 h-3.5" />
                  <span className="text-lg font-black text-white/80">
                    {recipes.length}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 🔍 ফিল্টার এরিয়া */}
        <div className="relative z-20 backdrop-blur-sm">
          <FilteredRecipe />
        </div>

        {/* 🎴 রেসিپیカード গ্রিড লেআউট */}
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-4 mt-8">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        ) : (
          /* 🔍 এম্পটি স্টেট */
          <div className="flex flex-col items-center justify-center min-h-75 border border-white/10 rounded-[2rem] bg-linear-to-b from-white/2 to-transparent mt-8 p-6 text-center relative overflow-hidden">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/30 text-xl mb-3">
              🍽️
            </div>
            <p className="text-white/60 font-bold text-lg tracking-wide">No Secret Recipes Found</p>
            <p className="text-white/30 text-xs mt-1 max-w-xs">We couldn&apos;t find anything matching your filters. Try clearing them.</p>
          </div>
        )}

        {/* 📄 পেজিনেশন সেকশন */}
        <div className="mt-12 flex justify-center border-t border-white/5 pt-8">
          <PaginationPage totalRecipe={totalRecipe} />
        </div>

      </div>
    </div>
  );
};

export default ExploreRecipesPage;