import { Component, OnInit } from '@angular/core';
import { Recipe, RestService } from '../lib/rest/rest.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe = new Recipe();
  imgUrl: string = "";

  constructor(private restService: RestService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
      this.restService.GetSingleRecipe(params['id']).then((data) => { this.recipe = data; this.getImage();});

    })
  }

  ngOnInit(): void {
  }

  getIngredientName(id: number) {
    return this.recipe.Ingredients.find(x => x.id === id)!.name
  }

  getImage() {
    this.imgUrl = `${environment.cdn}/img/${this.recipe.ImageName}.jpg`;
  }

}
