import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CarouselModule } from 'primeng/carousel';
import { RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { ImageService, Recipe, ImageData } from 'src/app/lib/api-client';

@Component({
    selector: 'app-latest-recipes',
    standalone: true,
    templateUrl: './latest-recipes.component.html',
    styleUrls: ['./latest-recipes.component.scss'],
    imports: [
      CarouselModule,
      RouterLink,
      JsonPipe,
    ]
})
export class LatestRecipesComponent implements OnChanges {

  @Input() recipes: Recipe[] = []

  responsiveOptions: any[] = [
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
  cdn: string = environment.cdn
  images: {[recipeId: string]: ImageData} = {}

  constructor(public imageService: ImageService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['recipes']) {
      console.log(this.recipes)
      // this.recipes.sort(this.sortByDateDesc)
      this.recipes.splice(6)
      this.loadImages()
    }
  }

  sortByDateDesc(a: any, b: any) {
    return new Date(b.CreatedAt).valueOf() - new Date(a.CreatedAt).valueOf();
  }

  loadImages() {
    this.recipes.forEach(recipe => {
      console.log(recipe)
      this.imageService.searchImage('recipe', recipe.id).subscribe((data) => {
        console.log(data);
        this.images[recipe.id!] = data;
      });
    });

    console.log(this.images)
  }

}
