import { TRecipe } from "@/types/interface";
import { serverMutation } from "../core/server"

export const createRecipe = async (recipeData:TRecipe) =>{
    const result = serverMutation(`/api/add-recipe`, recipeData);
    return result
}   