import { Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService, IngredientAmount, Recipe, Instruction } from '../lib/rest/rest.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnChanges {

  recipe: Recipe = new Recipe;
  cancelPopup: boolean = false;
  confirmPopup: boolean = false;
  fileUpload: boolean = false;
  api: string = environment.backend;
  imgUrl: string = "";
  amounts: Array<IngredientAmount> = [];
  instructions: Array<Instruction> = [];

  constructor(private restService: RestService, private messageService: MessageService, private router: Router, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
      this.restService.GetSingleRecipe(params['id']).then((data) => { this.recipe = data; this.getImgURL(); });
    })
  }

  ngOnInit(): void {
    // This is intentionally empty
  }

  ngOnChanges(changes: SimpleChanges) {
    // This is intentionally empty
  }

  getImgURL() {
    this.activatedRoute.params.subscribe(params => {
      this.imgUrl = `${environment.cdn}/img/${this.recipe.ImageName}.jpg?d=${(new Date()).getTime()}`;
    })
  }

  updateIngredientAmounts(ingredientamounts: IngredientAmount[]) {
    this.amounts = ingredientamounts;
  }

  cancelRecipeUpdate() {
    this.cancelPopup = true;
  }

  fileUploadToggle() {
    this.fileUpload = !this.fileUpload;
  }
  saveRecipeUpdate() {
    if (this.amounts.length == 0 || this.instructions.length == 0) {
      this.confirmPopup = true;
    } else {
      this.uploadRecipe();
    }
  }
  
  uploadRecipe() {
    this.confirmPopup = false;
    this.restService.UpdateRecipe(this.recipe)
    .then(() => this.saveSuccess(), () => this.saveFailed());
  }

  onUploadSuccess() {
    this.getImgURL()
    this.fileUploadToggle()
    this.messageService.add({
      severity: 'success', summary: 'Success', detail: 'Cover image uploaded', life: 3000,
    });
  }

  onUploadError() {
    this.messageService.add({
      severity: 'error', summary: 'Error', detail: 'Cover image upload failed', life: 3000,
    });
  }

  saveSuccess() {
    this.messageService.add({
      severity: 'success', summary: 'Update successful', detail: 'Recipe updated', life: 3000,
    });
    this.router.navigate(['app','recipes', this.recipe.ID]);
  }

  saveFailed() {
    this.messageService.add({
      severity: 'error', summary: 'Update failed', detail: 'Recipe update failed', life: 3000,
    });
  }

}
