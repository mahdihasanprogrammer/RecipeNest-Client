import { TRecipe } from "@/types/interface";
import { serverFetch } from "../core/server"

// user related
export const getMyRecipes = async (creatorId:string):Promise<TRecipe[]> =>{
    const result =await serverFetch<TRecipe[]>(`/api/my-recipes/${creatorId}`);
    return result
}