import { Component, OnInit, Input } from '@angular/core';
import { Recipe, RestService } from '../../lib/rest/rest.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-grid',
  templateUrl: './recipe-grid.component.html',
  styleUrls: ['./recipe-grid.component.scss']
})
export class RecipesGridComponent implements OnInit {

  @Input() recipes: Recipe[] = []

  searchText?: String

  api: string = environment.backend
  cdn: string = environment.cdn

  constructor(public router: Router) { }

  ngOnInit(): void {
    // intentionally left empty
  }
}
