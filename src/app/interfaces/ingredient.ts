

export interface UpdateIngredientDTO {
    id: number; // Required for identifying the ingredient to update
    name?: string;
    quantity?: string;
    unit?: string; // Optional unit of measurement
}

export interface CreateIngredientDTO  extends Omit<IngredientDTO, 'id'> {
    name: string;
    quantity: string;
    unit: string; // Optional unit of measurement
    recipe_id: number; // Required to associate the ingredient with a recipe
}

export interface IngredientDTO {
    id: number;
    name: string;
    quantity: string;
    unit?: string; // Optional unit of measurement
}