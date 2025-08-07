import { Component, inject } from '@angular/core';
import { RecipeInterface } from '../../interfaces/recipe-interface';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe-service';
import { Title } from '@angular/platform-browser';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {
  MatDialog,
} from '@angular/material/dialog';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // <-- Add this import


@Component({
  selector: 'app-recipe',
  imports: [MatListModule,MatIconModule,CommonModule,RouterModule],
  templateUrl: './recipe.html',
  styleUrl: './recipe.scss'
})
export class Recipe {
  recipeId : number = -1;

  recipe : RecipeInterface =  {
    title : "",
    image_url: "",
    description: "",
    ingredients : [],
    method: [],
    favorite : false, 
  }
  readonly dialog = inject(MatDialog);

  constructor(private recipe_service : RecipeService,private route: ActivatedRoute, private titleService: Title, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer){
    this.iconRegistry.addSvgIcon(
    'custom-icon',
    this.sanitizer.bypassSecurityTrustResourceUrl('/svg/edit.svg')
  );

  }


  
  ngOnInit() {
    this.recipeId = Number(this.route.snapshot.paramMap.get('recipe_id'));
    console.log(this.recipeId)
    this.recipe_service.get_recipe(this.recipeId).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
        this.recipe.method.sort((a, b) => a.step_number - b.step_number);

        console.log("Recipe fetched successfully:", recipe);
        this.titleService.setTitle(this.recipe.title);
      }, 
      error: (err) => {
        console.error("Error fetching recipe:", err);
      }
    });

      }

}
