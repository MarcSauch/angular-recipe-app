import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Recipe } from './pages/recipe/recipe';
import { CreateRecipe } from './pages/recipe/create-recipe/create-recipe';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'Home Page',
    },
    {
        path: 'recipes/:recipe_id',
        component: Recipe,
        title: '',
    },
    {
        path: 'create_recipe',
        component: CreateRecipe,
        title: 'New Recipe',
    },
    {
        path: 'edit-recipe/:recipe_id',
        component: CreateRecipe,
        title: 'Edit Recipe',
    }
];
