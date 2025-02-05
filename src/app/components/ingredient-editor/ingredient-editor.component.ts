import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ingredient, IngredientService, Unit, UnitService } from '../../lib/api-client';
import { UntypedFormBuilder } from "@angular/forms";
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateIngredientComponent } from '../create-ingredient/create-ingredient.component';

class IngredientAmount {
  RecipeID: string = "";
  IngredientID: string = "";
  Quantity: number = 0;
  UnitID: string = "";
  Unit?: Unit;
}

@Component({
    selector: 'app-ingredient-editor',
    standalone: true,
    templateUrl: './ingredient-editor.component.html',
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        DialogModule,
        DropdownModule,
        InputNumberModule,
        CreateIngredientComponent,
    ]
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
  ingredientNames = new Map<string, string>();
  unitNames = new Map<string, string>();

  constructor(public fb: UntypedFormBuilder, private ingredientService: IngredientService, private unitService: UnitService) {}

  ngOnInit(): void {
    this.getIngredients()
    this.getUnits()
  }

  getIngredients() {
    this.ingredientService.getAllIngredient().subscribe((data) => { this.ingredients = data; this.getIngredientNames(data); })
  }

  getUnits() {
    this.unitService.getAlUnits().subscribe((data) => {
      for (var unit of data) {
        this.unitNames.set(unit.id!, unit.full_name!);
      };
      this.units = data;
    });
  }

  getIngredientNames(ingredients: Array<Ingredient>) {
    for (var ingredient of ingredients) {
      this.ingredientNames.set(ingredient.id!, ingredient.name!);
    };

  }

  getIngredientName(data: IngredientAmount) {
    return this.ingredients.find(x => x.id === data.IngredientID)?.name
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
    if (i > -1) this.ingredientamounts[i] = this.newIngredient;
    else this.ingredientamounts.push(this.newIngredient);

    this.submitted = true;
    this.ingredientDialog = false;
    this.clearNewIngredient()
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
