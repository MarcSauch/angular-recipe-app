import { Ingredient } from "./ingredient";
import { Step } from "./step";

export interface RecipeInterface {
    id?: number,
    title: string,
    image: string,
    description: string,
    ingredients : Array<Ingredient>,
    method: Array<Step>,
    favorite : boolean 
}
