import { IngredientDTO } from "./ingredient";
import { Step } from "./step";

export interface RecipeInterface {
    id?: number,
    title: string,
    image_url: string,
    description: string,
    ingredients : Array<IngredientDTO>,
    method: Array<Step>,
    favorite : boolean 
}

export interface RecipeDTO {
    id: number,
    title: string,
    image_url: string,
    description: string,
    ingredients : Array<IngredientDTO>,
    method: Array<Step>,
    favorite : boolean 
}

export interface UpdateRecipeDTO{
    title?: string,
    image_url?: string,
    description?: string,
    favorite?: boolean,
}


export interface ReceiptCard extends Omit<RecipeDTO, 'ingredients' | 'method'> {
    id: number,
    title: string,
    image_url: string,
    description: string,
    favorite : boolean
}