import { Component, OnInit } from '@angular/core';
import { RestService, Recipe } from '../lib/rest/rest.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss']
})
export class RecipeCreateComponent implements OnInit {

  visible: boolean = false;
  submitted: boolean = false;
  recipe: Recipe = new Recipe();
  validationErrors: {} = {};

  constructor(private restService: RestService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.visible = true
  }
  closeDialog() {
    this.visible = false
  }
  createRecipe() {
    this.restService.CreateRecipe(this.recipe).then((data: Recipe) => this.onUploadSuccess(data.ID), this.onUploadError)
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
