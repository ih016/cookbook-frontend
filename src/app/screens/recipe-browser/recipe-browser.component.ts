import { Component, OnInit } from '@angular/core';
import { Recipe, RestService } from '../../lib/rest/rest.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-browser',
  templateUrl: './recipe-browser.component.html',
  styleUrls: ['./recipe-browser.component.scss']
})
export class RecipeBrowserComponent implements OnInit {

  allRecipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  api: string = environment.backend
  cdn: string = environment.cdn

  constructor(public router: Router, private restService: RestService) { }

  ngOnInit(): void {
    this.restService.GetAllRecipes().then((data) => { 
      this.filteredRecipes.push(...data);
      this.allRecipes.push(...data);
    })
  }

  passRecipes(r: Recipe[]) {
    this.filteredRecipes.length = 0
    this.filteredRecipes.push(...r)
  }

}
