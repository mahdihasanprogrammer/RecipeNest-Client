import { TContributors, TRecipe } from "@/types/interface";
import { protectedFetch, serverFetch } from "../core/server"

export type TRecipeResponse = {
  recipes: TRecipe[];
  totalRecipe: number;
};

// user handle this;

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
export const getAllRecipes = async(query : string):Promise<TRecipeResponse> =>{
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
    const result = serverFetch<TContributors[]>(`/api/recipes/top-contributors`);
    return result;
}
