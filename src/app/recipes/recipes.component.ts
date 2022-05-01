import { Component, OnInit } from '@angular/core';
import { Recipe, RestService } from '../rest.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private restService: RestService) { }

  ngOnInit(): void {
    console.log("init");
    this.restService.getAllRecipes().then((data) => {this.recipes = data; })
  }

}
