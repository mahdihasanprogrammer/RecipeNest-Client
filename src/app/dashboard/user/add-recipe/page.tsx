import { redirect } from "next/navigation";
import AddRecipeForm from "./AddRecipeForm";
import { getUserSession } from "@/lib/session";
import { TUser } from "@/types/interface";


export const metadata = {
    title: "Add New Recipe | RecipeNest",
    description: "Share your secret kitchen formula and cooking blueprint with the community.",
};

export default async function AddRecipePage() {
    const user = await getUserSession() as TUser;
    
    

    return (
        <main className="min-h-screen bg-[#0c0908] py-6 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 space-y-2">
                    <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                        Create New <span className="text-orange-400">Recipe</span>
                    </h1>
                    <p className="text-sm text-white/50">
                        Fill out the details below to archive and share your culinary blueprint.
                    </p>
                </div>

                {/* ক্লায়েন্ট ফর্ম কম্পোনেন্ট রেন্ডার */}
                <AddRecipeForm  user ={user}/>
            </div>
        </main>
    );
}