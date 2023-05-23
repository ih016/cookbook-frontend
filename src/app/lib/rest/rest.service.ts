import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class Recipe {
  ID: number = 0;
  CreatedAt: Date = new Date();
  UpdatedAt: Date = new Date();
  DeletedAt: Date = new Date();
  RecipeName?: string;
  Description?: string;
  CookTime?: number;
  DifficultyLevel?: number;
  ServingCount?: number;
  Ingredients: Array<Ingredient> = [];
  Categories?:  Array<Category>;
  Tags?: Array<Tag>;
  ImageName?: string;
}

export class Ingredient {
  ID: number = 0;
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
  StepNumber?: number;
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
  UnitID: number = 0;
  Unit?: Unit;
}

export class Unit {
  ID: number = 0;
  FullName: string = "";
  ShortName: string = "";
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
    return this.get<Recipe[]>('api/v1/recipe')
  }
  GetSingleRecipe(id: number) {
    return this.get<Recipe>(`api/v1/recipe/${id}`)
  }
  GetCoverImage(id: number) {
    return this.get<File>(`api/v1/recipe/${id}/cover`)
  }
  CreateRecipe(item: Recipe) {
    return this.post<Recipe>('api/v1/recipe', JSON.stringify(item))
  }
  UpdateRecipe(item: Recipe) {
    return this.put<Recipe>('api/v1/recipe', JSON.stringify(item))
  }
  DeleteRecipe(item: Recipe) {
    return this.delete<Recipe>('api/v1/recipe', JSON.stringify(item))
  }
  GetInstructions(recipeID: number) {
    return this.get<Instruction>(`api/v1/recipe/${recipeID}/instruction`)
  }
  GetAmounts(recipeID: number) {
    return this.get<IngredientAmount[]>(`api/v1/recipe/${recipeID}/ingredients`)
  }

  // Ingredients
  GetAllIngredients() {
    return this.get<Ingredient[]>('api/v1/ingredient')
  }
  GetSingleIngredient(id: number) {
    return this.get<Ingredient>(`api/v1/ingredient/${id}`)
  }
  GetUnits() {
    return this.get<Unit[]>("api/v1/ingredient/unit")
  }
  CreateIngredient(item: Ingredient) {
    return this.post<Ingredient>('api/v1/ingredient', JSON.stringify(item))
  }
  DeleteIngredient(item: Ingredient) {
    return this.delete<Ingredient>('api/v1/ingredient', JSON.stringify(item))
  }
}

