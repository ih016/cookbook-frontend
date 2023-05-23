import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RestService, Ingredient, IngredientAmount, Unit } from '../../lib/rest/rest.service';
import { UntypedFormBuilder } from "@angular/forms";

@Component({
  selector: 'app-ingredient-editor',
  templateUrl: './ingredient-editor.component.html',
})
export class IngredientEditorComponent implements OnInit {

  @Input() ingredientamounts: IngredientAmount[] = []
  @Output() updateIngredientAmounts = new EventEmitter<IngredientAmount[]>();

  // dialog states
  ingredientDialog: boolean = false;
  deleteIngredientDialog: boolean = false;
  deleteIngredientsDialog: boolean = false;
  
  submitted: boolean = false;
  ingredient: IngredientAmount = new IngredientAmount();
  ingredients: Ingredient[] = [];
  selectedIngredients: IngredientAmount[] = [];
  units: Unit[] = [];
  ingredientNames = new Map<number, string>();
  unitNames = new Map<number, string>();

  constructor(public fb: UntypedFormBuilder, private restService: RestService) { }

  ngOnInit(): void {
    this.getIngredients()
    this.getUnits()
  }

  getIngredients() {
    this.restService.GetAllIngredients().then((data) => { this.ingredients = data; this.getIngredientNames(data); })
  }

  getUnits() {
    this.restService.GetUnits().then((data) => {
      for (var unit of data) {
        this.unitNames.set(unit.ID, unit.FullName);
      };
      this.units = data;
    });
  }

  getIngredientNames(ingredients: Array<Ingredient>) {
    for (var ingredient of ingredients) {
      this.ingredientNames.set(ingredient.ID, ingredient.IngredientName);
    };

  }

  getIngredientName(data: IngredientAmount) {
    return this.ingredients.find(x => x.ID === data.IngredientID)?.IngredientName
  }

  openNew() {
    this.ingredient.IngredientID = 0;
    this.ingredient.RecipeID = 0;
    this.ingredient.Quantity = 0;
    this.ingredient.UnitID = 0;
    this.submitted = false;
    this.ingredientDialog = true;
  }

  hideDialog() {
    this.ingredientDialog = false;
    this.submitted = false;
  }

  confirmDeleteIngredient(ingredientAmount: IngredientAmount) {
    this.ingredient = ingredientAmount;
    this.deleteIngredientDialog = true;
  }

  confirmDeleteSelected() {
    this.deleteIngredientsDialog = true;
  }

  editIngredient(ingredient: IngredientAmount) {
    this.ingredient = { ...ingredient };
    this.ingredientDialog = true;
  }

  saveIngredient() {
    this.submitted = true;
    const i = this.ingredientamounts.findIndex(
      (x: IngredientAmount) => x.IngredientID === this.ingredient.IngredientID,
    );
    if (i > -1) this.ingredientamounts[i] = this.ingredient;
    else this.ingredientamounts.push(this.ingredient);

    this.ingredientDialog = false;
    this.ingredient = new IngredientAmount;
  }

  deleteIngredient() {
    this.updateIngredientAmounts.emit(this.ingredientamounts.filter((object: IngredientAmount) => object['IngredientID'] !== this.ingredient.IngredientID));
    this.deleteIngredientDialog = false;
    this.ingredient = new IngredientAmount;
  }

  deleteSelectedIngredients() {
    let newArray = this.ingredientamounts.filter((object: IngredientAmount) => !this.selectedIngredients.includes(object));
    this.updateIngredientAmounts.emit(newArray);
    this.deleteIngredientsDialog = false;
    this.selectedIngredients = [];
  }
}
