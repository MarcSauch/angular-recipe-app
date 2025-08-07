import { Component } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { ReceiptCardInterface } from '../../interfaces/receipt-card';
import {MatCardModule} from '@angular/material/card';
import { MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe-service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [MatCardModule,MatList,CommonModule,],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  recipes : Array<ReceiptCardInterface> = []

  
  constructor(private recipe_service : RecipeService , private router : Router){
    // recieves data from api
    recipe_service.get_recipe_card().subscribe({
      next: (data) => {
        console.log("Recipes fetched successfully:", data);
        this.recipes = data;
        // Sort the recipes by favorite status
        this.recipes.sort((a, b) => Number(b.favorite) - Number(a.favorite));
      },
      error: (err) => { 
        console.error("Error fetching recipes:", err);
      } 
    });

  }

  on_click(index: number,event :MouseEvent)
  {
    // stops any other event from triggering (Event Bubbling)
    event.stopPropagation()

    // If the recipe is already favored, updated it to false else true then re-sort
    console.log("Clicked on recipe at index:", index);
    const recipe = this.recipes[index];
    const newFavoriteStatus = !recipe.favorite;
    this.recipe_service.update_recipe_favorite(recipe.id, newFavoriteStatus).subscribe({
      next: () => {
        console.log(`Recipe ${recipe.id} favorite status updated to:`, newFavoriteStatus);
        recipe.favorite = newFavoriteStatus;
        // // Re-sort the recipes after updating the favorite status
        this.recipes.sort((a, b) => Number(b.favorite) - Number(a.favorite));
      }, 
      error: (err) => {
        console.error(`Error updating favorite status for recipe ${recipe.id}:`, err);
      }
    });
  
  }

  nav_recipe(recipeId : number)
  {
    // Navigate the user to the recipe page
    this.router.navigate(['/recipes/', recipeId]);
  }

}
