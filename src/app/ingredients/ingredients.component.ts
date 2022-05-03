import { Component, OnInit } from '@angular/core';
import { Ingredient, RestService } from '../lib/rest/rest.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
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

  getIngredients() {
    this.restService.getAllIngredients().then((data) => { this.ingredients = data; this.loading = false })
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
    this.restService.deleteIngredient(this.ingredient).then((data) => this.updateSuccess(data)).catch((data) => this.updateFailed(data));
  }
  updateSuccess(data: Ingredient) {
    this.messageService.add({ severity: 'success', summary: 'Update successful', detail: data.name });
  }
  updateFailed(data: Ingredient) {
    this.messageService.add({ severity: 'error', summary: 'Update failed', detail: data.name });
  }

}
