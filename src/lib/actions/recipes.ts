import { TRecipe, TSuccess } from "@/types/interface";
import { serverMutation } from "../core/server"

export const createRecipe = async (recipeData:TRecipe) =>{
    const result = serverMutation(`/api/add-recipe`, recipeData);
    return result
}   
export const DeleteRecipe = async (recipeId : string):Promise<TSuccess> =>{
    const result = serverMutation<TSuccess>(`/api/delete-recipe/${recipeId}`, {}, 'DELETE');
    return result
}   