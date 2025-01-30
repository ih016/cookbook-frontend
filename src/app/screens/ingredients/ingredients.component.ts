import { Component, OnInit } from '@angular/core';
import { IngredientService, Ingredient } from '../../lib/api-client';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
})
export class IngredientsComponent implements OnInit {
  ingredient: Ingredient = {};
  ingredients: Ingredient[] = [];
  loading: boolean = true;
  filters: object = {};
  deleteIngredientDialog: boolean = false;
  deleteIngredientsDialog: boolean = false;
  selectedIngredients: Ingredient[] = [];

  constructor(private ingredientService: IngredientService, public messageService: MessageService) { }

  ngOnInit(): void {
    this.getIngredients()
  }

  getEventValue($event: any): string {
    return $event.target.value;
  } 

  getIngredients() {
    this.ingredientService.getAllIngredient().subscribe((data) => {
      this.ingredients = data;
    });
  }

  clearFilter(table: any) {
    table.clear();
  }

  confirmDeleteIngredient(ingredient: Ingredient) {
    this.ingredient = ingredient;
    this.deleteIngredientDialog = true;
  }

  confirmDeleteSelected() {
    this.deleteIngredientsDialog = true;
  }
  deleteIngredient() {
    this.ingredientService.deleteIngredient(this.ingredient.id!).subscribe({
      next: () => { 
        this.updateSuccess()
        this.deleteIngredientDialog = false;
        this.getIngredients()
      },
      error: () => {
        this.updateFailed()
      }
    });
  }
  
  deleteIngredients() {
    for (let ingredient of this.selectedIngredients) {
      this.ingredientService.deleteIngredient(ingredient.id!).subscribe({
        next: () => {
          this.updateSuccess()
          this.deleteIngredientDialog = false;
          this.getIngredients()
        },
        error: () => {
          this.updateFailed()
        }
      });
    }
    this.deleteIngredientsDialog = false;
    this.getIngredients()
  }
  updateSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Update successful' });
  }
  updateFailed() {
    this.messageService.add({ severity: 'error', summary: 'Update failed' });
  }

}
