import { Component, inject, Input, input } from '@angular/core';
import { Location } from '@angular/common';
import { RecipeInterface } from '../../../interfaces/recipe-interface';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { AddIngredient } from '../../../components/add-ingredient/add-ingredient';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AddStep } from '../../../components/add-step/add-step';
import { MatListModule } from '@angular/material/list';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RecipeService } from '../../../services/recipe-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-recipe',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule,MatIcon ,MatListModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './create-recipe.html',
  styleUrl: './create-recipe.scss'
})
export class CreateRecipe {
@Input() recipe_id: number | null = null;

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private recipe_service: RecipeService,private router : Router){
    console.log(this.recipe_id);
  // Registering SVG icons for use in the component
  // Change to Angular Material's MatIconRegistry but Example on how to create custom icons
  //   this.iconRegistry.addSvgIcon(
  //   'delete',
  //   this.sanitizer.bypassSecurityTrustResourceUrl('/svg/delete.svg')
  // );
  }


  readonly dialog = inject(MatDialog);
  title_is_editing: boolean = false;
  description_is_editing: boolean = false;
  
  // Form Controls
  recipeForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    image: new FormControl('', [Validators.required]),
    ingredients: new FormControl<any[]>([] ),
    method: new FormControl<any[]>([]),
    favorite: new FormControl(false)
  });

  // Getter methods for easy access to form values
  // never needed to use this, but it is a good practice to have
  get recipe(): RecipeInterface {
    return {
      title: this.recipeForm.get('title')?.value || '',
      description: this.recipeForm.get('description')?.value || '',
      image: this.recipeForm.get('image')?.value || '',
      ingredients: this.recipeForm.get('ingredients')?.value || [],
      method: this.recipeForm.get('method')?.value || [],
      favorite: this.recipeForm.get('favorite')?.value || false
    };
  }

  on_change(event : KeyboardEvent)
  {
    let element  = document.getElementById("Title") as HTMLInputElement
    
    this.recipe.title = element.value
  }

  open_dialog_indigents()
  {
    const dialogRef = this.dialog.open(AddIngredient, 
      {
        data: {recipe: this.recipe},
      });
    
    dialogRef.afterClosed().subscribe(result => 
      {
        console.log('The dialog was closed');
        if (result !== undefined) {
          const currentIngredients: any[] = this.recipeForm.get('ingredients')?.value || [];
          currentIngredients.push(result);
          this.recipeForm.get('ingredients')?.setValue(currentIngredients);
          console.log(this.recipe)
        }
      });
  }

  open_dialog_steps()
  {
    const dialogRef = this.dialog.open(AddStep, 
      {
        data: {recipe: this.recipe},
      });
    
    dialogRef.afterClosed().subscribe(result => 
      {
        console.log('The dialog was closed');
        if (result !== undefined) {
          const currentSteps: any[] = this.recipeForm.get('method')?.value || [];
          currentSteps.push(result);
          this.recipeForm.get('method')?.setValue(currentSteps);
          console.log(this.recipe)
        }
      });
  }

  remove_ingredient(index : number)
  {
    const currentIngredients: any[] = this.recipeForm.get('ingredients')?.value || [];
    currentIngredients.splice(index,1);
    this.recipeForm.get('ingredients')?.setValue(currentIngredients);
  }

  remove_step(index : number)
  {
    const currentSteps: any[] = this.recipeForm.get('method')?.value || [];
    currentSteps.splice(index,1);
    this.recipeForm.get('method')?.setValue(currentSteps);
  }

  update_title(event: any) {
    console.log(event.srcElement.value);
    this.recipeForm.get('title')?.setValue(event.srcElement.value);
    this.title_is_editing = false;
  }

  update_description(event: any) {
    console.log(event.srcElement.value);
    this.recipeForm.get('description')?.setValue(event.srcElement.value);
    this.description_is_editing = false;
  }


  upload_file(event: any) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.recipeForm.get('image')?.setValue(reader.result as string);
        
        localStorage.setItem('recipe_image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  on_submit() {
    if (this.recipeForm.valid) {
      console.log('Recipe submitted:', this.recipe);
      console.log('Form valid:', this.recipeForm.valid);
      console.log('Form value:', this.recipeForm.value);
      if (this.recipe_id !== null) {
        // If recipe_id is provided, update the existing recipe
        if (this.recipe_service.update_recipe(this.recipe_id, this.recipe))
        {
          this.router.navigate(['/recipes/', this.recipeForm.value.title]);
        }

      }
      else{
          this.recipe_service.create_recipe(this.recipe);
      }

    } else {
      console.log('Recipe', this.recipe);
      console.log('Form is invalid');
      console.log('Form errors:', this.recipeForm.errors);
      // Mark all fields as touched to show validation errors
      Object.keys(this.recipeForm.controls).forEach(key => {
        this.recipeForm.get(key)?.markAsTouched();
      });
    }
  }

  ngOnInit() {
    console.log('ngOnInit called');
    if (this.recipe_id !== null) {
      // If recipe_id is provided, fetch the recipe data
      const recipe = this.recipe_service.get_recipe_by_id(this.recipe_id);
      if (recipe) {
        this.recipeForm.patchValue(recipe);
        this.recipeForm.patchValue(recipe);
      } else {
        console.error('Recipe not found for id:', this.recipe_id);
      }
    }
    
  }

  ngOnChanges() {
    console.log('ngOnChanges called');
    console.log('Recipe id:', this.recipe_id);
  }
}

