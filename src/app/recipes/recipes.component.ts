import { Component, OnInit } from '@angular/core';
import { Recipe, RestService } from '../lib/rest/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  image: string = 'chicken.jpg'

  constructor(public router: Router, private restService: RestService) { }

  ngOnInit(): void {
    this.restService.getAllRecipes().then((data) => {this.recipes = data; })
  }
}
