import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Ingredient {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface IngredientAmount {
  recipeid: number;
  ingredientid: number;
  amount: number;
  unit: string;
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
  baseURL: string = environment.baseURL;

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
  getAllRecipes() {
    return this.get<Recipe[]>('recipe')
  }
  getSingleRecipe(id: number) {
    return this.get<Recipe>(`recipe/${id}`)
  }
  CreateRecipe(item: Recipe) {
    return this.post<Recipe>('recipe', JSON.stringify(item))
  }
  UpdateRecipe(item: Recipe) {
    return this.post<Recipe>('recipe', JSON.stringify(item))
  }
  DeleteRecipe(item: Recipe) {
    return this.delete<Recipe>('recipe', JSON.stringify(item))
  }

  // Ingredients
  getAllIngredients() {
    return this.get<Ingredient[]>('ingredients')
  }
  getSingleIngredient(id: number) {
    return this.get<Ingredient[]>(`ingredients/${id}`)
  }
  createIngredient(item: Ingredient) {
    return this.post<Ingredient>('ingredients', JSON.stringify(item))
  }
  deleteIngredient(item: Ingredient) {
    return this.delete<Ingredient>('ingredients', JSON.stringify(item))
  }
}

