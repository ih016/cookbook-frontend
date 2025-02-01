import { Component, OnInit, Input } from '@angular/core';
import { Recipe, MetadataSearchResponse } from '../../lib/api-client';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CardModule } from 'primeng/card';
import { JsonPipe } from '@angular/common';
import { RecipeCreateComponent } from '../recipe-create/recipe-create.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-recipe-grid',
    standalone: true,
    templateUrl: './recipe-grid.component.html',
    styleUrls: ['./recipe-grid.component.scss'],
    imports: [
        JsonPipe,
        CardModule,
        ChipModule,
        CommonModule,
        RecipeCreateComponent,
        RouterLink,
        TagModule,
    ]
})
export class RecipesGridComponent implements OnInit {

  @Input() recipes: Recipe[] = []
  @Input() recipeMetadata: MetadataSearchResponse[] = []

  searchText?: String
  combinedRecipes = this.recipes.map((recipe) => ({
    ...recipe,
    related: this.recipeMetadata.find((metadata) => metadata.recipe_id === recipe.id),
    ImageName: ""
  }));

  api: string = environment.backend
  cdn: string = environment.cdn

  constructor(public router: Router) { }

  ngOnInit(): void {
  }
}
