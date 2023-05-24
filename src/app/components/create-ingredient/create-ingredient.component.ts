import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ingredient, RestService } from '../../lib/rest/rest.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-ingredient',
  templateUrl: './create-ingredient.component.html',
})
export class CreateIngredientComponent implements OnInit {

  @Output() createdIngredient = new EventEmitter<boolean>();

  visible: boolean = false;
  ingredient: Ingredient = new Ingredient();
  validationErrors: Object = {};
  isFormValid: boolean = false;

  constructor(private restService: RestService, public messageService: MessageService) { }

  ngOnInit(): void {
    // This is intentionally empty
  }
  
  openDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
    this.ingredient.IngredientName = ""
  }

  createIngredient() {
    this.visible = false;
    this.restService.CreateIngredient(this.ingredient)
    .then((data) => this.createSuccess(data))
    .catch((data) => this.createFailed(data));
    this.ingredient.IngredientName = ""
  }
  
  createSuccess(data: Ingredient) {
    this.messageService.add({ severity: 'success', summary: 'Created Ingredient', detail: data.IngredientName });
    this.createdIngredient.emit(true);
  }

  createFailed(data: Ingredient) {
    this.messageService.add({ severity: 'error', summary: 'Create failed', detail: data.IngredientName });
  }
}
