import { TContributors, TRecipe, TUserDashboardStatsResponse } from "@/types/interface";
import { protectedFetch, serverFetch } from "../core/server"

export type TRecipeResponse = {
  recipes: TRecipe[];
  totalRecipe?: number;
};

// user handle this;

// user dashboard stats;
export const getUserDashboardStats = async():Promise<TUserDashboardStatsResponse> =>{
    const result = await protectedFetch<TUserDashboardStatsResponse>(`/api/user/dashboard-stats`);
    return result;
}

// get my recipe;
export const getMyRecipes = async (creatorId:string):Promise<TRecipe[]> =>{
    const result =await protectedFetch<TRecipe[]>(`/api/my-recipe/${creatorId}`);
 
    return result
}

// get latest recipe , not protected;
export const getLatestRecipe = async():Promise<TRecipe[]> =>{
    const result = await serverFetch<TRecipe[]>(`/api/latest-recipes`);
    return result;
}

// public recipe not protected;
export const getAllRecipes = async(query? : string):Promise<TRecipeResponse> =>{
    const result = await serverFetch<TRecipeResponse>(`/api/public/recipes?${query}`);
    return result;
}


//get recipe by id not protected;
export const getRecipeById = async(recipeId:string) :Promise<TRecipe> =>{
    const result = await serverFetch<TRecipe>(`/api/recipes/${recipeId}`);
    return result;
}


// get top contributors , not protected;
export const getTopContributors = async ():Promise<TContributors[]> =>{
    const result =await serverFetch<TContributors[]>(`/api/recipes/top-contributors`);
    return result;
}
