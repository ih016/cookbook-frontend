import { Component, OnInit } from '@angular/core';
// import { Recipe, RestService } from '../../lib/api-client/rest.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RecipeService, Recipe, MetadataService, MetadataSearchRequest, MetadataSearchResponse } from '../../lib/api-client';
import { RecipesGridComponent } from 'src/app/components/recipe-grid/recipe-grid.component';
import { FilteringSidebarComponent } from 'src/app/components/filtering-sidebar/filtering-sidebar.component';

@Component({
    selector: 'app-recipe-browser',
    standalone: true,
    templateUrl: './recipe-browser.component.html',
    styleUrls: ['./recipe-browser.component.scss'],
    imports: [
        RecipesGridComponent,
        FilteringSidebarComponent,
    ]
})
export class RecipeBrowserComponent implements OnInit {

  allRecipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  recipeMetadata: MetadataSearchResponse[] = [];
  api: string = environment.backend
  cdn: string = environment.cdn

  constructor(public router: Router, private recipeService: RecipeService, private metadataService: MetadataService) { }

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe((data) => {
      this.filteredRecipes = data;
      this.allRecipes = data;
    });
    for (var recipe of this.allRecipes) {
      var searchRequest: MetadataSearchRequest = {recipe_id: recipe.id}
      this.metadataService.searchMetadata(searchRequest).subscribe((data) => {
        this.recipeMetadata.push(data);
      })
    }
  }

  passRecipes(r: Recipe[]) {
    this.filteredRecipes.length = 0
    this.filteredRecipes.push(...r)
  }

}
