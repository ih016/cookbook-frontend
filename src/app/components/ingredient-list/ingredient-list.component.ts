import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Ingredient, IngredientAmount } from 'src/app/lib/rest/rest.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-ingredient-list',
    standalone: true,
    templateUrl: './ingredient-list.component.html',
    styleUrls: ['./ingredient-list.component.scss'],
    imports: [
        CommonModule,
    ]
})
export class IngredientListComponent implements OnInit, OnChanges {

  @Input() ingredients: Ingredient[] = []
  @Input() amounts: IngredientAmount[] = []

  names = new Map<number, string>();

  constructor() { }

  ngOnInit(): void {
    // this.getIngredientNames(this.ingredients);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ingredients']) {
      this.getIngredientNames(this.ingredients);
    }
  }

  getIngredientNames(ingredients: Array<Ingredient>) {
    for (var ingredient of ingredients) {
      this.names.set(ingredient.ID, ingredient.IngredientName);
    };

  }

}
