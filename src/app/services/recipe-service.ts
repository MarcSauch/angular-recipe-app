import { inject, Injectable } from '@angular/core';
import { RecipeInterface, UpdateRecipeDTO } from '../interfaces/recipe-interface';
import { ReceiptCardInterface } from '../interfaces/receipt-card';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  base_url = "http://localhost:8010/api/recipes";
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  http = inject(HttpClient);
  // Database Table
  // recipes : Array<RecipeInterface> = [
  //   {
  //     id: 1,
  //     title: "5 Minute Soup",
  //     image_url: "chicken-noodle-soup",
  //     description: "Quick and easy Chicken Soup",
  //     ingredients: [
  //       {name: "chicken", amount : 500, unit: "kg"}, 
  //       {name: "chicken stock",amount : 1 , unit : "cups"},
  //       {name: "Carrots",amount : 2 , unit : ""} , 
  //       {name: "noodles" , amount : 1/2, unit: 'pack'}
  //     ],
  //     method: [
  //       {body: "Cut chicken into small pieces"}, 
  //       {body: "In a small pot pour the chicken stock into it "},
  //       {body: "add chicken and noodles"}],
  //       favorite: false
  //   }, 
  //   {
  //     id: 2,
  //     title: "Fluffy Pancakes",
  //     image_url: "Fluffy-Pancakes",
  //     description: "Light and fluffy pancakes perfect for breakfast.",
  //     ingredients: [
  //       { name: "flour", amount: 1.5, unit: "cups" },
  //       { name: "milk", amount: 1.25, unit: "cups" },
  //       { name: "egg", amount: 1, unit: "" },
  //       { name: "baking powder", amount: 3.5, unit: "tsp" },
  //       { name: "salt", amount: 0.5, unit: "tsp" },
  //       { name: "butter (melted)", amount: 3, unit: "tbsp" }
  //     ],
  //     method: 
  //     [
  //       { body: "In a bowl, mix flour, baking powder, and salt." },
  //       { body: "Add in milk, egg, and melted butter. Stir until combined." },
  //       { body: "Heat a non-stick pan and pour batter to form pancakes." },
  //       { body: "Cook each side until golden brown." }
  //     ],
  //     favorite : false
  //   },
  //   {
  //     id: 3,
  //     title: "Spaghetti Aglio e Olio",
  //     image_url: "Spaghetti-Aglio-e-Olio",
  //     description: "A simple and delicious Italian pasta dish with garlic and oil.",
  //     ingredients: 
  //     [
  //       { name: "spaghetti", amount: 200, unit: "g" },
  //       { name: "garlic", amount: 4, unit: "cloves" },
  //       { name: "olive oil", amount: 0.25, unit: "cup" },
  //       { name: "chilli flakes", amount: 1, unit: "tsp" },
  //       { name: "parsley", amount: 2, unit: "tbsp" }
  //     ],
  //     method: 
  //     [
  //       { body: "Cook spaghetti until al dente." },
  //       { body: "In a pan, heat olive oil and sauté garlic until golden." },
  //       { body: "Add chilli flakes and stir." },
  //       { body: "Toss in cooked spaghetti and mix well." },
  //       { body: "Garnish with parsley and serve." }
  //     ], 
  //     favorite: false
  //   },
  //   {
  //     id: 4,
  //     title: "Veggie Stir-Fry",
  //     image_url: "Veggie Stir-Fry",
  //     description: "A healthy and quick vegetable stir-fry.",
  //     ingredients: [
  //       { name: "broccoli", amount: 1, unit: "cup" },
  //       { name: "carrot", amount: 1, unit: "" },
  //       { name: "capsicum", amount: 1, unit: "" },
  //       { name: "soy sauce", amount: 2, unit: "tbsp" },
  //       { name: "garlic", amount: 2, unit: "cloves" },
  //       { name: "oil", amount: 1, unit: "tbsp" }
  //     ],
  //     method: [
  //       { step: "Heat oil in a wok over medium-high heat.",step_number: 1 },
  //       { body: "Add chopped garlic and sauté briefly." , step_number: 2 },
  //       { body: "Add all vegetables and stir-fry for 5-7 minutes." , step_number: 3 },
  //       { body: "Add soy sauce and mix well before serving." }
  //     ],
  //     favorite: false
  //   }
  // ]

  recipes: Array<RecipeInterface> = [];

  constructor() { }

  get_recipe_card() : Observable<Array<ReceiptCardInterface>>
  {
    const url = this.base_url + "/recipes-card"
    return this.http.get<Array<ReceiptCardInterface>>(url);
  }

  get_recipe(recipeID : Number)
  {
    const url: string = this.base_url + "/recipe/" + recipeID;
    return this.http.get<RecipeInterface>(url);
  }

  get_recipe_by_id(recipe_id: number): Observable<RecipeInterface> {
    const url: string = this.base_url + "/recipe/" + recipe_id;
    return this.http.get<RecipeInterface>(url);
  }

    create_recipe(receipt: RecipeInterface): Observable<any>
  {
    const tmp = {
      title: receipt.title,
      image_url: receipt.image_url,
      description: receipt.description,
      ingredients: receipt.ingredients,
      method: receipt.method,
      favorite: receipt.favorite
    }
    const url: string = this.base_url + "/create-recipe";
    console.log("sending recipe off", tmp)
    return this.http.post(url, tmp)
    // this.recipes.push(receipt);
    // console.log('Recipe created:', receipt);
    // console.log('Current recipes:', this.recipes);
    // //simulate saving to a database
    // return true
  }

  update_recipe(recipe_id: number, updated_recipe: UpdateRecipeDTO): Observable<any>
  {
    console.log('Updating recipe with id:', recipe_id);
    console.log('Updated recipe data:', updated_recipe);
    const url:string = this.base_url + `/recipe/${recipe_id}/update`; 
    return this.http.post(url, updated_recipe);

  }

  update_recipe_favorite(recipe_id: number, favorite: boolean) : Observable<any>
  {
    const url: string = this.base_url + `/recipe/${recipe_id}/favorite/`;
    const body = { favorite: favorite };
    return this.http.post(url, body)

  }




}
