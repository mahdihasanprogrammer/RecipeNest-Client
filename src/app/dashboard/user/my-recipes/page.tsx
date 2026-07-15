

import MyRecipeTable from "@/components/dashboard/user/my-recipes/MyRecipeTable";
import { getMyRecipes } from "@/lib/api/recipes";
import { getUserSession } from "@/lib/session";
import Link from "next/link";
import { FiPlus, FiCoffee } from "react-icons/fi";

const MyRecipesPage = async () => {
    const user = await getUserSession();
    
   
    const myRecipes = (await getMyRecipes(user?.id as string)) || [];
    console.log('user id', user?.id)
    const totalRecipes = myRecipes.length;

    return (
        <div className="container mx-auto space-y-8  md:px-0">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                            My Recipes
                        </h1>
                        {/* টোটাল রেসিপি কাউন্টার ব্যাজ */}
                        {totalRecipes > 0 && (
                            <span className="text-xs font-bold px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-lg">
                                Nest Size: {totalRecipes}
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-white/50 mt-1.5">
                        Manage, scale, and review your personal culinary blueprints.
                    </p>
                </div>
                
                {/* অরেঞ্জ গ্রেডিয়েন্ট এবং হোভার ইফেক্টসহ প্রিমিয়াম বাটন */}
                {totalRecipes > 0 && (
                    <Link 
                        href="/dashboard/user/add-recipe" 
                        className="bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-[0.98] text-white font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-orange-500/10 transition-all text-sm self-start sm:self-center cursor-pointer"
                    >
                        <FiPlus className="w-4 h-4 stroke-0.5" /> Add New Recipe
                    </Link>
                )}
            </div>

            {/* 🚀 কন্ডিশনাল রেন্ডারিং */}
            {totalRecipes > 0 ? (
                <MyRecipeTable recipes={myRecipes} />
            ) : (
                /* গ্লোয়িং ইফেক্টসহ প্রিমিয়াম এম্পটি স্টেট */
                <div className="relative flex flex-col items-center justify-center min-h-[80vh] border border-white/10 rounded-3xl bg-white/2 backdrop-blur-md text-center p-6 overflow-hidden">
                    {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
                    <div className="absolute w-60 h-60 bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" />
                    
                    {/* আইকন কন্টেইনার */}
                    <div className="w-20 h-20 bg-linear-to-b from-white/10 to-transparent border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                        <FiCoffee className="text-orange-400 text-3xl animate-pulse" />
                    </div>
                    
                    {/* টেক্সট কন্টেন্ট */}
                    <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Your Nest is Empty</h2>
                    <p className="text-white/40 max-w-sm text-sm leading-relaxed mb-8">
                        You haven&apos;t created any recipes yet. Start your culinary journey by adding your first masterpiece!
                    </p>

                    {/* মেইন সিটিএ বাটন */}
                    <Link 
                        href="/dashboard/user/add-recipe" 
                        className="bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-95 text-white font-bold px-8 py-3.5 rounded-2xl flex items-center gap-2.5 shadow-xl shadow-orange-500/10 hover:shadow-orange-500/20 transition-all text-sm md:text-base cursor-pointer"
                    >
                        <FiPlus className="w-5 h-5 stroke-0.5" /> Create My First Recipe
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyRecipesPage;