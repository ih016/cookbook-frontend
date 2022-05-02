import { Component, OnInit } from '@angular/core';
import { Recipe, RestService } from '../lib/rest/rest.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe = new Recipe();
  image: string = "chicken.jpg"

  constructor(private restService: RestService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
      console.log(activatedRoute)
      this.restService.getSingleRecipe(params['id']).then((data) => { this.recipe = data; })
    })
  }

  ngOnInit(): void {
  }

  getIngredientName(id: number) {
    return this.recipe.ingredients.find(x => x.id === id)!.name
  }

}
