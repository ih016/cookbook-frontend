import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class Recipe {
  ID: number = 0;
  CreatedAt: Date = new(Date);
  UpdatedAt?: Date;
  DeletedAt?: Date;
  RecipeName?: string;
  Description?: string;
  CookTime?: number;
  DifficultyLevel?: number;
  ServingCount?: number;
  Ingredients: Array<Ingredient> = [];
  Categories:  Array<Category> =[];
  Tags?: Array<Tag>;
  ImageName?: string;
}

export class Ingredient {
  ID: number = 0;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  DeletedAt?: Date;
  IngredientName: string = "";
}

export class Instruction {
  id: number = 0;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  DeletedAt?: Date;
  RecipeID: number = 0;
  Description: string = "";
}

export class Tag {
  id: number = 0;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  DeletedAt?: Date;
  TagName: string = "";
}

export class Category {
  id: number = 0;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  DeletedAt?: Date;
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
        console.log('response body:', response)
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
    console.log(body)
    return new Promise((success) => {
      this.http.put<Type>(`${this.baseURL}/${url}`, body).subscribe((response: Type) => {
        success(response);
      })
    });
  }
  delete<Type>(url: string): Promise<Type> {
    return new Promise((success) => {
      this.http.delete<Type>(`${this.baseURL}/${url}`).subscribe((response: Type) => {
        success(response);
      })
    });
  }

  // Recipes
  GetAllRecipes() {
    return this.get<Recipe[]>('api/v2/recipe')
  }
  GetSingleRecipe(id: number) {
    return this.get<Recipe>(`api/v2/recipe/${id}`)
  }
  CreateRecipe(item: Recipe) {
    return this.post<Recipe>('api/v2/recipe', JSON.stringify(item))
  }
  UpdateRecipe(id: number, item: Recipe) {
    return this.put<Recipe>(`api/v2/recipe/${id}`, JSON.stringify(item))
  }
  DeleteRecipe(id: number) {
    return this.delete<Recipe>(`api/v2/recipe/${id}`)
  }


  GetCoverImage(id: number) { // delete
    return this.get<File>(`api/v2/images/${id}`)
  }

  // Images
  GetAllImages() {
    return this.get
  }

  // Instructions
  GetInstructions(recipeID: number) {
    return this.get<Instruction>(`api/v1/instructions/${recipeID}/instruction`)
  }
  CreateInstructions(recipeID: number, instruction: Instruction) {
    return this.post<Instruction>(`api/v1/recipe/${recipeID}/instruction`, JSON.stringify(instruction))
  }
  UpdateInstructions(recipeID: number, instruction: Instruction) {
    return this.put<Instruction>(`api/v1/recipe/${recipeID}/instruction`, JSON.stringify(instruction))
  }

  // Amounts
  GetAmounts(recipeID: number) {
    return this.get<IngredientAmount[]>(`api/v1/recipe/${recipeID}/ingredients`)
  }
  UpdateAmounts(recipeID: number, amounts: IngredientAmount[]) {
    return this.put<IngredientAmount[]>(`api/v1/recipe/${recipeID}/ingredients`, JSON.stringify(amounts))
  }

  // Ingredients
  GetAllIngredients() {
    return this.get<Ingredient[]>('api/v1/ingredient')
  }
  GetSingleIngredient(id: number) {
    return this.get<Ingredient>(`api/v1/ingredient/${id}`)
  }
  CreateIngredient(item: Ingredient) {
    return this.post<Ingredient>('api/v1/ingredient', JSON.stringify(item))
  }
  DeleteIngredient(id: number) {
    return this.delete<Ingredient>(`api/v1/ingredient/${id}`)
  }

  // Units
  GetUnits() {
    return this.get<Unit[]>("api/v1/ingredient/unit")
  }

  // Tags
  GetAllTags() {
    return this.get<Tag[]>('api/v1/tag')
  }

  // Categories
  GetAllCategories() {
    return this.get<Category[]>('api/v1/category')
  }
}

