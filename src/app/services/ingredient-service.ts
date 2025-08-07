import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateIngredientDTO, IngredientDTO } from '../interfaces/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  base_url = "http://localhost:8010/api/ingredients";
  http = inject(HttpClient);
  constructor() { }

  delete_ingredient(ingredient_id: number): Observable<any> {
    const url: string = `${this.base_url}/ingredient/${ingredient_id}`;
    return this.http.delete(url);
  }

  add_ingredient(ingredient: CreateIngredientDTO): Observable<any> {
    const url: string = `${this.base_url}/create-ingredient`;
    return this.http.post(url, ingredient );
  }
  
}