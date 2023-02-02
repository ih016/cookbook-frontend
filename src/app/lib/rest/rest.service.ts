import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class Recipe {
  ID: number = 0;
  CreatedAt: Date = new Date();
  UpdatedAt: Date = new Date();
  DeletedAt: Date = new Date();
  RecipeName: string = "";
  Description: string = "";
  method: string = "";
  CookTime: number = 0;
  DifficultyLevel: number = 0;
  ServingCount: number = 0;
  Ingredients: Array<Ingredient> = [];
  IngredientAmounts: Array<IngredientAmount> = [];
  Tags: Array<Tag> = [];
  Categories: Array<string> = [];
  ImageName: string = "";
}

export class Ingredient {
  id: number = 0;
  CreatedAt: Date = new Date();
  UpdatedAt: Date = new Date();
  DeletedAt: Date = new Date();
  IngredientName: string = "";
}

export class Instruction {
  id: number = 0;
  CreatedAt: Date = new Date();
  UpdatedAt: Date = new Date();
  DeletedAt: Date = new Date();
  RecipeID: number = 0;
  StepNumber: number = 0;
  Description: string = "";
}

export class Tag {
  id: number = 0;
  CreatedAt: Date = new Date();
  UpdatedAt: Date = new Date();
  DeletedAt: Date = new Date();
  TagName: string = "";
}

export class Category {
  id: number = 0;
  CreatedAt: Date = new Date();
  UpdatedAt: Date = new Date();
  DeletedAt: Date = new Date();
  CategoryName: string = "";
}

export class IngredientAmount {
  RecipeID: number = 0;
  IngredientID: number = 0;
  Quantity: number = 0;
  Unit: string = "";
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

