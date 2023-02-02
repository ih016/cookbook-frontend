import { Component, OnInit } from '@angular/core';
import { Ingredient, RestService } from '../lib/rest/rest.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
})
export class IngredientsComponent implements OnInit {
  ingredient: Ingredient = new Ingredient();
  ingredients: Ingredient[] = [];
  loading: boolean = true;
  filters: object = {};
  deleteIngredientDialog: boolean = false;
  deleteIngredientsDialog: boolean = false;
  selectedIngredients: Ingredient[] = [];

  constructor(private restService: RestService, public messageService: MessageService) { }

  ngOnInit(): void {
    this.getIngredients()
  }

  getEventValue($event: any): string {
    return $event.target.value;
  } 

  getIngredients() {
    this.restService.GetAllIngredients().then((data) => { this.ingredients = data; this.loading = false })
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
    this.restService.DeleteIngredient(this.ingredient).then(() => this.updateSuccess()).catch(() => this.updateFailed());
    this.deleteIngredientDialog = false;
    this.getIngredients()
  }
  deleteIngredients() {
    for (let ingredient of this.selectedIngredients) {
      this.restService.DeleteIngredient(ingredient).then(() => this.updateSuccess()).catch(() => this.updateFailed());
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
