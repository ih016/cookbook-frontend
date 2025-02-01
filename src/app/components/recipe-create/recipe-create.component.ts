import { Component, OnInit } from '@angular/core';
import { RestService, Recipe, Instruction } from '../../lib/rest/rest.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-recipe-create',
  standalone: true,
  templateUrl: './recipe-create.component.html',
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    InputNumberModule,
  ]
})
export class RecipeCreateComponent implements OnInit {

  visible: boolean = false;
  submitted: boolean = false;
  recipe: Recipe = new Recipe();
  validationErrors: {} = {};
  InstructionTemplate: Instruction = new(Instruction);

  constructor(private restService: RestService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    // This is intentionally empty
  }

  openDialog() {
    this.visible = true
  }
  closeDialog() {
    this.visible = false
  }
  createRecipe() {
    let id: number = 0
    console.log(this.recipe)
    this.restService.CreateRecipe(this.recipe).then(
      (data: Recipe) => {
        this.InstructionTemplate.RecipeID = data.ID;
        this.restService.CreateInstructions(data.ID, this.InstructionTemplate);
        this.onUploadSuccess(data.ID);
      }, this.onUploadError)
  }

  onUploadSuccess(id: number) {

    this.messageService.add({
      severity: 'success', summary: 'Success', detail: 'Recipe created', life: 3000,
    });
    this.router.navigate(['app', 'recipes', id, 'edit'])
  }

  onUploadError() {
    this.messageService.add({
      severity: 'error', summary: 'Error', detail: 'Recipe creation failed', life: 3000,
    });
  }

}
