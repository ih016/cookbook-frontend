import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class Ingredient {
  id: number = 0;
  name: string = "";
}

export class Tag {
  id: number = 0;
  name: string = "";
}

export class IngredientAmount {
  recipeid: number = 0;
  ingredientid: number = 0;
  amount: number = 0;
  unit: string = "";
}

export class Recipe {
  id: number = 0;
  title: string = "";
  description: string = "";
  method: string = "";
  preptime: number = 0;
  cooktime: number = 0;
  persons: number = 0;
  ingredients: Array<Ingredient> = [];
  ingredientamounts: Array<IngredientAmount> = [];
  tags: Array<Tag> = [];
}

@Injectable({
  providedIn: 'root'
})
export class RestService {
  baseURL: string = environment.backend;

  constructor(private http: HttpClient) { }

  get<Type>(url: string): Promise<Type> {
    return new Promise((success) => {
      this.http.get<Type>(`${this.baseURL}/${url}`).subscribe((response: Type) => {
        success(response);
      })
    });
  }
  post<Type>(url: string, body: string): Promise<Type> {
    return new Promise((success) => {
      this.http.post<Type>(`${this.baseURL}/${url}`, body).subscribe((response: Type) => {
        success(response);
      })
    });
  }
  put<Type>(url: string, body: string): Promise<Type> {
    return new Promise((success) => {
      this.http.put<Type>(`${this.baseURL}/${url}`, body).subscribe((response: Type) => {
        success(response);
      })
    });
  }
  delete<Type>(url: string, body: string): Promise<Type> {
    return new Promise((success) => {
      this.http.delete<Type>(`${this.baseURL}/${url}`, {body: body}).subscribe((response: Type) => {
        success(response);
      })
    });
  }

  // Recipes
  GetAllRecipes() {
    return this.get<Recipe[]>('v1/recipe')
  }
  GetSingleRecipe(id: number) {
    return this.get<Recipe>(`v1/recipe/${id}`)
  }
  GetCoverImage(id: number) {
    return this.get<File>(`images/${id}/cover.jpg`)
  }
  CreateRecipe(item: Recipe) {
    return this.post<Recipe>('v1/recipe', JSON.stringify(item))
  }
  UpdateRecipe(item: Recipe) {
    return this.put<Recipe>('v1/recipe', JSON.stringify(item))
  }
  DeleteRecipe(item: Recipe) {
    return this.delete<Recipe>('v1/recipe', JSON.stringify(item))
  }

  // Ingredients
  GetAllIngredients() {
    return this.get<Ingredient[]>('v1/ingredients')
  }
  GetSingleIngredient(id: number) {
    return this.get<Ingredient[]>(`v1/ingredients/${id}`)
  }
  CreateIngredient(item: Ingredient) {
    return this.post<Ingredient>('v1/ingredients', JSON.stringify(item))
  }
  DeleteIngredient(item: Ingredient) {
    return this.delete<Ingredient>('v1/ingredients', JSON.stringify(item))
  }
}

