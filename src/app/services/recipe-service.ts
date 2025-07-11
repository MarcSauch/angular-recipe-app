import { Injectable } from '@angular/core';
import { RecipeInterface } from '../interfaces/recipe-interface';
import { ReceiptCardInterface } from '../interfaces/receipt-card';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // Database Table
  recipes : Array<RecipeInterface> = [
    {
      id: 1,
      title: "5 Minute Soup",
      image: "chicken-noodle-soup",
      description: "Quick and easy Chicken Soup",
      ingredients: [
        {name: "chicken", amount : 500, unit: "kg"}, 
        {name: "chicken stock",amount : 1 , unit : "cups"},
        {name: "Carrots",amount : 2 , unit : ""} , 
        {name: "noodles" , amount : 1/2, unit: 'pack'}
      ],
      method: [
        {body: "Cut chicken into small pieces"}, 
        {body: "In a small pot pour the chicken stock into it "},
        {body: "add chicken and noodles"}],
        favorite: false
    }, 
    {
      id: 2,
      title: "Fluffy Pancakes",
      image: "Fluffy-Pancakes",
      description: "Light and fluffy pancakes perfect for breakfast.",
      ingredients: [
        { name: "flour", amount: 1.5, unit: "cups" },
        { name: "milk", amount: 1.25, unit: "cups" },
        { name: "egg", amount: 1, unit: "" },
        { name: "baking powder", amount: 3.5, unit: "tsp" },
        { name: "salt", amount: 0.5, unit: "tsp" },
        { name: "butter (melted)", amount: 3, unit: "tbsp" }
      ],
      method: 
      [
        { body: "In a bowl, mix flour, baking powder, and salt." },
        { body: "Add in milk, egg, and melted butter. Stir until combined." },
        { body: "Heat a non-stick pan and pour batter to form pancakes." },
        { body: "Cook each side until golden brown." }
      ],
      favorite : false
    },
    {
      id: 3,
      title: "Spaghetti Aglio e Olio",
      image: "Spaghetti-Aglio-e-Olio",
      description: "A simple and delicious Italian pasta dish with garlic and oil.",
      ingredients: 
      [
        { name: "spaghetti", amount: 200, unit: "g" },
        { name: "garlic", amount: 4, unit: "cloves" },
        { name: "olive oil", amount: 0.25, unit: "cup" },
        { name: "chilli flakes", amount: 1, unit: "tsp" },
        { name: "parsley", amount: 2, unit: "tbsp" }
      ],
      method: 
      [
        { body: "Cook spaghetti until al dente." },
        { body: "In a pan, heat olive oil and sauté garlic until golden." },
        { body: "Add chilli flakes and stir." },
        { body: "Toss in cooked spaghetti and mix well." },
        { body: "Garnish with parsley and serve." }
      ], 
      favorite: false
    },
    {
      id: 4,
      title: "Veggie Stir-Fry",
      image: "Veggie Stir-Fry",
      description: "A healthy and quick vegetable stir-fry.",
      ingredients: [
        { name: "broccoli", amount: 1, unit: "cup" },
        { name: "carrot", amount: 1, unit: "" },
        { name: "capsicum", amount: 1, unit: "" },
        { name: "soy sauce", amount: 2, unit: "tbsp" },
        { name: "garlic", amount: 2, unit: "cloves" },
        { name: "oil", amount: 1, unit: "tbsp" }
      ],
      method: [
        { body: "Heat oil in a wok over medium-high heat." },
        { body: "Add chopped garlic and sauté briefly." },
        { body: "Add all vegetables and stir-fry for 5-7 minutes." },
        { body: "Add soy sauce and mix well before serving." }
      ],
      favorite: false
    }
  ]


  
  constructor() { }

  get_recipe_card()
  {
    let recipe_card : Array<ReceiptCardInterface> = []
    this.recipes.forEach(element => {
      recipe_card.push({title: element.title, image: element.image,description: element.description , favorite : element.favorite})
    });
    return recipe_card
  }

  get_recipe(recipe_title : string)
  {
    let recipe = this.recipes.find((element) => element.title == recipe_title);
    return recipe
  }

  get_recipe_by_id(recipe_id: number){
    let recipe = this.recipes.find((element) => element.id == recipe_id);
    if(recipe === undefined)
    {
      console.error("Recipe not found with id:", recipe_id);
      return null;
    }
    return recipe;
  }


  update_recipe(recipe_id: number, updated_recipe: RecipeInterface)
  {
    const index = this.recipes.findIndex(item => item.id === Number(recipe_id));
    console.log(index)
    if (index !== -1) {
      this.recipes[index] = { ...this.recipes[index], ...updated_recipe };
      console.log('Recipe updated:', this.recipes[index]);
      return true;
    } else {
      console.error('Recipe not found with id:', recipe_id);
      return false;
    }
  }



  create_recipe(receipt: RecipeInterface)
  {
    this.recipes.push(receipt);
    console.log('Recipe created:', receipt);
    console.log('Current recipes:', this.recipes);
    //simulate saving to a database
    return true
  }

}
