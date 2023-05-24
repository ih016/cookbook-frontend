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

  newIngredient: IngredientAmount = new IngredientAmount();
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

  clearNewIngredient() {
    this.newIngredient = new IngredientAmount;
  }

  openNew() {
    this.clearNewIngredient()
    this.submitted = false;
    this.ingredientDialog = true;
  }

  hideDialog() {
    this.clearNewIngredient()
    this.ingredientDialog = false;
    this.submitted = false;
  }

  confirmDeleteIngredient(ingredientAmount: IngredientAmount) {
    this.newIngredient = ingredientAmount;
    this.deleteIngredientDialog = true;
  }

  confirmDeleteSelected() {
    this.deleteIngredientsDialog = true;
  }

  editIngredient(ingredient: IngredientAmount) {
    this.newIngredient = { ...ingredient };
    this.ingredientDialog = true;
  }

  saveIngredient() {
    const i = this.ingredientamounts.findIndex(
      (x: IngredientAmount) => x.IngredientID === this.newIngredient.IngredientID,
      );
      console.log(i)
    if (i > -1) this.ingredientamounts[i] = this.newIngredient;
    else this.ingredientamounts.push(this.newIngredient);
      
    this.submitted = true;
    this.ingredientDialog = false;
    this.clearNewIngredient()
    console.log(this.ingredientamounts)
  }

  deleteIngredient() {
    this.updateIngredientAmounts.emit(this.ingredientamounts.filter((object: IngredientAmount) => object['IngredientID'] !== this.newIngredient.IngredientID));
    this.deleteIngredientDialog = false;
    this.clearNewIngredient()
  }

  deleteSelectedIngredients() {
    let newArray = this.ingredientamounts.filter((object: IngredientAmount) => !this.selectedIngredients.includes(object));
    this.updateIngredientAmounts.emit(newArray);
    this.deleteIngredientsDialog = false;
    this.selectedIngredients = [];
  }
}
