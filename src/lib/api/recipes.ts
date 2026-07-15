import { TRecipe } from "@/types/interface";
import { serverFetch } from "../core/server"

export type TRecipeResponse = {
  recipes: TRecipe[];
  totalRecipe: number;
};

// user handle this;

export const getMyRecipes = async (creatorId:string):Promise<TRecipe[]> =>{
    const result =await serverFetch<TRecipe[]>(`/api/my-recipes/${creatorId}`);
    return result
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
