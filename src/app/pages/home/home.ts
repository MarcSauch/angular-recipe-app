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
    let data = recipe_service.get_recipe_card()
    // sorts data based on if they favorite the item
    data.sort((a, b) => Number(b.favorite) - Number(a.favorite));
    // save the list to be rendered by the front end
    this.recipes = data
  }

  on_click(index: number,event :MouseEvent)
  {
    // stops any other event from triggering (Event Bubbling)
    event.stopPropagation()

    // If the recipe is already favored, updated it to false else true then re-sort
    if(this.recipes[index].favorite == true)
    {
      this.recipes[index].favorite = !this.recipes[index].favorite
      this.recipes.sort((a, b) => Number(b.favorite) - Number(a.favorite));
    }
    else{
      this.recipes[index].favorite = !this.recipes[index].favorite
      this.recipes.unshift(this.recipes.splice(index, 1)[0]);
    }
  
  }

  nav_recipe(title : string)
  {
    // Navigate the user to the recipe page
    this.router.navigate(['/recipes/', title],);
  }

}
