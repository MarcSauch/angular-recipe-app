export function addIngredientWithRecipe(result: any, ingredientService: any, recipeForm: any): void {
  console.log('Adding new ingredient:', result);
  const newIngredient: any = {
    recipe_id: recipeForm.value.recipe_id,
    name: result.name,
    quantity: result.amount,
    unit: result.unit
  };
  
  ingredientService.add_ingredient(newIngredient).subscribe({
    next: (response: any) => {
      console.log('Ingredient added successfully:', response.ingredient);
      const ingredient: any = {
        id: response.ingredient.id,
        name: response.ingredient.name,
        quantity: response.ingredient.quantity,
        unit: response.ingredient.unit
      };
      
      const currentIngredients: any[] = recipeForm.get('ingredients')?.value || [];
      currentIngredients.push(ingredient);
      recipeForm.get('ingredients')?.setValue(currentIngredients);
      console.log('Updated ingredients:', recipeForm.get('ingredients')?.value);
    },
    error: (error: any) => {
      console.error('Error adding ingredient:', error);
    }
  });
}

export function addIngredientWithoutRecipe(result: any, recipeForm: any): void {
  const currentIngredients: any[] = recipeForm.get('ingredients')?.value || [];
  currentIngredients.push({
    name: result.name,
    quantity: result.amount,
    unit: result.unit
  });
  
  recipeForm.get('ingredients')?.setValue(currentIngredients);
  console.log('Added ingredient without recipe:', recipeForm.get('ingredients')?.value);
}