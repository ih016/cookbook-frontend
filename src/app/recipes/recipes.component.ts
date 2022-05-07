import { Component, OnInit } from '@angular/core';
import { Recipe, RestService } from '../lib/rest/rest.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  api: string = environment.backend

  constructor(public router: Router, private restService: RestService) { }

  ngOnInit(): void {
    this.restService.GetAllRecipes().then((data) => {this.recipes = data; })
  }
}
