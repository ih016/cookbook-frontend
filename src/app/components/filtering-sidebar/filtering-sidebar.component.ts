import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe, Tag, Category, RestService } from '../../lib/rest/rest.service';

@Component({
  selector: 'app-filtering-sidebar',
  templateUrl: './filtering-sidebar.component.html',
  styleUrls: ['./filtering-sidebar.component.scss']
})
export class FilteringSidebarComponent implements OnInit {

  @Input() inputRecipes: Recipe[] = []
  @Output() outputRecipes = new EventEmitter<Recipe[]>();

  constructor(private restServce: RestService) { }

  ngOnInit(): void {
    this.restServce.GetAllTags().then((data) => { 
      this.tags.push(...data);
    });

    this.restServce.GetAllCategories().then((data) => {
      this.categories.push(...data);
    });
  }

  filtersVisible: boolean = false;
  tags: Tag[] = []
  categories: Category[] = []
  selectedCategory?: Category
  selectedTag?: Tag

  filteredRecipes: Recipe[] = []

  invokeFilterLogic() {
    let intermediateResult: Recipe[] = []
    intermediateResult.length = 0

    this.filteredRecipes.splice(0)

    intermediateResult = this.categoryFiltered(this.inputRecipes)
    intermediateResult = this.tagsFiltered(intermediateResult)

    this.outputRecipes.emit(intermediateResult)
  }

  categoryFiltered(recipes: Recipe[]): Recipe[] {
    let result: Recipe[] = []

    if (this.selectedCategory === undefined || this.selectedCategory === null) {
      return recipes
    }

    recipes.find((recipe) => {
      if (recipe.Categories.some((category) => {
        return category.CategoryName === this.selectedCategory?.CategoryName;
      })) {
        result.push(recipe)
      }
    })

    return result
  }

  tagsFiltered(recipes: Recipe[]): Recipe[] {
    let result: Recipe[] = []

    if (this.selectedTag === undefined || this.selectedTag === null) {
      return recipes
    }

    this.inputRecipes.find((recipe) => {
      if (recipe.Tags?.some((tag) => {
        return tag.TagName === this.selectedTag?.TagName;
      })) {
        result.push(recipe)
      }
    })

    return result
  }
}
