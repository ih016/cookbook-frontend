import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ingredient, RestService } from '../lib/rest/rest.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-ingredient',
  templateUrl: './create-ingredient.component.html',
  styleUrls: ['./create-ingredient.component.scss']
})
export class CreateIngredientComponent implements OnInit {

  @Output() createdIngredient = new EventEmitter<boolean>();

  visible: boolean = false;
  ingredient: Ingredient = new Ingredient();
  validationErrors: Object = {};
  isFormValid: boolean = false;

  constructor(private restService: RestService, public messageService: MessageService) { }

  ngOnInit(): void {
  }
  
  openDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
    this.ingredient.name = ""
  }

  createIngredient() {
    this.visible = false;
    this.restService.createIngredient(this.ingredient)
    .then((data) => this.createSuccess(data))
    .catch((data) => this.createFailed(data));
    this.ingredient.name = ""
    this.createdIngredient.emit(true);
  }

  createSuccess(data: Ingredient) {
    this.messageService.add({ severity: 'success', summary: 'Created Ingredient', detail: data.name });
  }

  createFailed(data: Ingredient) {
    this.messageService.add({ severity: 'error', summary: 'Create failed', detail: data.name });
  }
}
