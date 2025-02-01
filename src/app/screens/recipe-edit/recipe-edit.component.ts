import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService, IngredientAmount, Recipe, Instruction, Ingredient, Category, Tag } from '../../lib/rest/rest.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { IngredientEditorComponent } from 'src/app/components/ingredient-editor/ingredient-editor.component';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-recipe-edit',
    standalone: true,
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.scss'],
    imports: [
        CommonModule,
        DialogModule,
        FormsModule,
        FileUploadModule,
        IngredientEditorComponent,
        InputNumberModule,
        RouterLink,
        MultiSelectModule,
    ]
})
export class RecipeEditComponent implements OnInit {

  recipe: Recipe = new Recipe;
  cancelPopup: boolean = false;
  confirmPopup: boolean = false;
  fileUpload: boolean = false;
  api: string = environment.backend;
  imgUrl: string = "";
  amounts: Array<IngredientAmount> = [];
  instructions: Instruction = new(Instruction);
  names = new Map<number, string>();
  categories: Category[] = [];
  tags: Tag[] = [];


  constructor(private restService: RestService, private messageService: MessageService, private router: Router, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
      this.restService.GetSingleRecipe(params['id']).then((data) => { this.recipe = data; this.getImgURL(); this.getIngredientNames(this.recipe.Ingredients); });
      this.restService.GetInstructions(params['id']).then((data) => { this.instructions = data });
      this.restService.GetAmounts(params['id']).then((data) => { this.amounts = data });
      this.restService.GetAllCategories().then((data) => this.categories = data, () => this.messageService.add({
        severity: 'error', summary: 'category retrieval failed', detail: 'failed to retrieve list of categories', life: 3000,
      }));
      this.restService.GetAllTags().then((data) => this.tags = data, () => this.messageService.add({
        severity: 'error', summary: 'tag retrieval failed', detail: 'failed to retrieve list of tags', life: 3000,
      }));
    })
  }

  ngOnInit(): void {
    // This is intentionally empty
  }

  getImgURL() {
    this.activatedRoute.params.subscribe(params => {
      this.imgUrl = `${environment.cdn}/img/${this.recipe.ImageName}.jpg?d=${(new Date()).getTime()}`;
    })
  }

  getIngredientNames(ingredients: Array<Ingredient>) {
    for (var ingredient of ingredients) {
      this.names.set(ingredient.ID, ingredient.IngredientName);
    };

  }

  updateIngredientAmounts(ingredientamounts: IngredientAmount[]) {
    this.amounts = ingredientamounts;
  }

  updateCategories(categories: Category[]) {

  }

  cancelRecipeUpdate() {
    this.cancelPopup = true;
  }

  fileUploadToggle() {
    this.fileUpload = !this.fileUpload;
  }
  saveRecipeUpdate() {
    if (this.amounts.length == 0 || this.instructions.Description.length == 0) {
      this.confirmPopup = true;
    } else {
      this.uploadRecipe();
    }
  }

  uploadRecipe() {
    this.confirmPopup = false;
    this.restService.UpdateAmounts(this.recipe.ID, this.amounts);
    this.restService.UpdateRecipe(this.recipe.ID, this.recipe)
    this.restService.UpdateInstructions(this.recipe.ID, this.instructions)
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
