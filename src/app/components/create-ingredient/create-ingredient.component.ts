import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ingredient, IngredientService } from '../../lib/api-client';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-create-ingredient',
    standalone: true,
    templateUrl: './create-ingredient.component.html',
    imports: [
        CommonModule,
        DialogModule,
        FormsModule,
    ]
})
export class CreateIngredientComponent implements OnInit {

  @Output() createdIngredient = new EventEmitter<boolean>();

  visible: boolean = false;
  ingredient: Ingredient = {};
  validationErrors: Object = {};
  isFormValid: boolean = false;

  constructor(private restService: IngredientService, public messageService: MessageService) { }

  ngOnInit(): void {
    // This is intentionally empty
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
    this.restService.createIngredient(this.ingredient);
    // .then((data) => this.createSuccess(data))
    // .catch((data) => this.createFailed(data));
    this.ingredient.name = ""
  }

  createSuccess(data: Ingredient) {
    this.messageService.add({ severity: 'success', summary: 'Created Ingredient', detail: data.name });
    this.createdIngredient.emit(true);
  }

  createFailed(data: Ingredient) {
    this.messageService.add({ severity: 'error', summary: 'Create failed', detail: data.name });
  }
}
