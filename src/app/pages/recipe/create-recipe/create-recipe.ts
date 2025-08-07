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
import { IngredientService } from '../../../services/ingredient-service';
import { MethodService } from '../../../services/method-service';
import { UpdateRecipeDTO } from '../../../interfaces/recipe-interface';
import { CreateIngredientDTO, IngredientDTO } from '../../../interfaces/ingredient';

@Component({
  selector: 'app-create-recipe',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule,MatIcon ,MatListModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './create-recipe.html',
  styleUrl: './create-recipe.scss'
})
export class CreateRecipe {
  @Input() recipe_id: number | null = null;
  ingredient_service = inject(IngredientService);
  method_service = inject(MethodService);


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
    image_url: new FormControl('', [Validators.required]),
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
      image_url: this.recipeForm.get('image_url')?.value || '',
      ingredients: this.recipeForm.get('ingredients')?.value || [],
      method: this.recipeForm.get('method')?.value || [],
      favorite: this.recipeForm.get('favorite')?.value || false
    };
  }

  get_image_url(): string {
    const imageUrl = this.recipeForm.get('image_url')?.value || '';
    if (imageUrl && imageUrl.startsWith('data:image/')) {
      return imageUrl; // Return the base64 image URL
    }
    else{
      return `/recipe_image/${imageUrl}.jpg`; // Return the URL for the image
    }
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
          if( this.recipe_id !== null && this.recipe_id !== undefined) {
            console.log('Adding new ingredient:', result);
            const newIngredient: CreateIngredientDTO = {
              recipe_id: this.recipe_id!,
                name: result.name,
                quantity: result.amount,
                unit: result.unit
            };
            this.ingredient_service.add_ingredient(newIngredient).subscribe({
              next: (response) => {
                console.log('Ingredient added successfully:', response.ingredient);
                const ingredient: IngredientDTO = {
                  id: response.ingredient.id,
                  name: response.ingredient.name,
                  quantity: response.ingredient.quantity,
                  unit: response.ingredient.unit,
                };
                const currentIngredients: any[] = this.recipeForm.get('ingredients')?.value || [];
                currentIngredients.push(ingredient);
                this.recipeForm.get('ingredients')?.setValue(currentIngredients);
                console.log('Updated ingredients:', this.recipeForm.get('ingredients')?.value);

              },
              error: (error) => {
                console.error('Error adding ingredient:', error);
              }
            });
          }
          else{
             const currentIngredients: any[] = this.recipeForm.get('ingredients')?.value || [];
            currentIngredients.push({
              name: result.name,
              quantity: result.amount,
              unit: result.unit
            });
            this.recipeForm.get('ingredients')?.setValue(currentIngredients);
            console.log(this.recipe);
          }
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
          // console.log("recip id", this.recipe_id);
          if (this.recipe_id !== null && this.recipe_id !== undefined) {
            console.log('Adding new step:', result);
            const currentSteps: any[] = this.recipeForm.get('method')?.value || [];
            console.log('Current steps:', currentSteps.length);
            const newStep = {
              recipe_id: this.recipe_id!,
              step: result.body,
              step_number: currentSteps.length + 1
            };
            this.method_service.create_step(newStep).subscribe({
              next: (response) => {
                console.log('Step added successfully:', response.method);
                const currentSteps: any[] = this.recipeForm.get('method')?.value || [];
                currentSteps.push(response.method);
                this.recipeForm.get('method')?.setValue(currentSteps);
                console.log('Updated steps:', this.recipeForm.get('method')?.value);
              },
              error: (error) => {
                console.error('Error adding step:', error);
              }
            });
          }
          else{
            console.log('Adding new step:', result);
            // If recipe_id is not provided, just add the step to the form
            const currentSteps: any[] = this.recipeForm.get('method')?.value || [];
            currentSteps.push({
              step: result.body,
              step_number: currentSteps.length + 1,
            });
            this.recipeForm.get('method')?.setValue(currentSteps);
            console.log(this.recipe);
          }
        }
      });
  }

  remove_ingredient(index : number)
  {
    const ingredient = this.recipeForm.get('ingredients')?.value![index];
    console.log('Removing ingredient:', ingredient);
    if (this.recipe_id !== null && this.recipe_id !== undefined) {
      this.ingredient_service.delete_ingredient(ingredient.id).subscribe({
        next: (response) => {
          console.log('Ingredient deleted successfully:', response);
          const currentIngredients: any[] = this.recipeForm.get('ingredients')?.value || [];
          currentIngredients.splice(index, 1);
        this.recipeForm.get('ingredients')?.setValue(currentIngredients);
      },
      error: (error) => {
        console.error('Error deleting ingredient:', error);
      }
    });
  }
    else {
      const currentIngredients: any[] = this.recipeForm.get('ingredients')?.value || [];
      currentIngredients.splice(index, 1);
      this.recipeForm.get('ingredients')?.setValue(currentIngredients);
    }
   
  }

  remove_step(index : number)
  {
    const step = this.recipeForm.get('method')?.value![index];
    console.log('Removing step:', step);
    if (this.recipe_id !== null && this.recipe_id !== undefined) {
      this.method_service.delete_step(step.id).subscribe({
      next: (response) => {
        console.log('Step deleted successfully:', response);
        const currentSteps: any[] = this.recipeForm.get('method')?.value || [];
        currentSteps.splice(index,1);
        this.recipeForm.get('method')?.setValue(currentSteps);
      },
      error: (error) => {
        console.error('Error deleting step:', error);
      }
    });
    }
    else {
      const currentSteps: any[] = this.recipeForm.get('method')?.value || [];
      currentSteps.splice(index, 1);
      this.recipeForm.get('method')?.setValue(currentSteps);
    }
    
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
        this.recipeForm.get('image_url')?.setValue(reader.result as string);
        
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
      if (this.recipe_id !== null && this.recipe_id !== undefined) {
        // If recipe_id is provided, update the existing 
        const updatedRecipe: UpdateRecipeDTO = {
          title: this.recipeForm.get('title')!.value || undefined,
          image_url: this.recipeForm.get('image_url')!.value || undefined,
          description: this.recipeForm.get('description')!.value || undefined, 
          favorite: this.recipeForm.get('favorite')!.value || undefined
        };
        this.recipe_service.update_recipe(this.recipe_id, updatedRecipe).subscribe({
          next: (response) => {
            console.log('Recipe updated successfully:', response);
            this.router.navigate(['/recipes', this.recipe_id]);
          },
          error: (error) => {
            console.error('Error updating recipe:', error);
          }
        });

      }
      else{
          this.recipe_service.create_recipe(this.recipe).subscribe({
        next: (response) => { 
          console.log('Recipe created successfully:', response)
          this.router.navigate(['/recipes', response.id])
          },
          error: (error) => {
            console.error('Error creating recipe:', error)
            // Handle error appropriately
          }
        });
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
    if (this.recipe_id !== null && this.recipe_id !== undefined) {
    this.recipe_service.get_recipe_by_id(this.recipe_id).subscribe({
        next: (recipe) => {
          this.recipeForm.patchValue(recipe);
          console.log("Recipe fetched successfully:", recipe);
          console.log("Recipe Form Value:", this.recipeForm.value);
        },
        error: (err) => {
          console.error("Error fetching recipe:", err);
        }
      });
    
  }
}

  ngOnChanges() {
    console.log('ngOnChanges called');
    console.log('Recipe id:', this.recipe_id);
  }
}

