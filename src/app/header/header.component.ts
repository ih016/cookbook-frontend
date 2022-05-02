import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {

  menuOptions: MenuItem[];

  constructor() {
    this.menuOptions = []
  }

  ngOnInit(): void {
    this.menuOptions = [
      { label: 'Recipes', routerLink: ['/app/recipes'] },
      { label: 'Ingredients', routerLink: ['/app/ingredients'] },
      { label: 'Shopping Lists', routerLink: ['/app/shopping'] },
      { label: 'Mealplanner', routerLink: ['/app/planner['] },
    ]
  }

  goHome() {
    
  }

}
