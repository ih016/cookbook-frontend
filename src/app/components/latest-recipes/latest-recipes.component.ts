import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Recipe } from '../../lib/rest/rest.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-latest-recipes',
  templateUrl: './latest-recipes.component.html',
  styleUrls: ['./latest-recipes.component.scss']
})
export class LatestRecipesComponent implements OnInit, OnChanges {

  @Input() inputRecipes: Recipe[] = []

  responsiveOptions: any[] = [];
  cdn: string = environment.cdn

  constructor() { }

  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: '992px',
        numVisible: 4,
        numScroll: 4
      },
      {
        breakpoint: '768px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '576px',
        numVisible: 2,
        numScroll: 2
      }
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputRecipes']) {
      this.inputRecipes.sort(this.sortByDateDesc)
      this.inputRecipes.splice(6)
    }
  }

  sortByDateDesc(a: any, b: any) {
    return new Date(b.CreatedAt).valueOf() - new Date(a.CreatedAt).valueOf();
  }

}
