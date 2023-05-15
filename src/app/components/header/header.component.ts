import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {

  mobileMenuOptions: MenuItem[] = [
    { label: 'Recipes', routerLink: ['/app/recipes'] },
    { label: 'Ingredients', routerLink: ['/app/ingredients'] },
    { label: 'Shopping Lists', routerLink: ['/app/shopping'] },
    { label: 'Mealplanner', routerLink: ['/app/planner'] },
    { separator: true },
    { label: 'Profile', routerLink: ['/app/profile'] },
  ];

  bigMenuOptions: MenuItem[] = [
    { label: 'Recipes', routerLink: ['/app/recipes'] },
    { label: 'Ingredients', routerLink: ['/app/ingredients'] },
    { label: 'Shopping Lists', routerLink: ['/app/shopping'] },
    { label: 'Mealplanner', routerLink: ['/app/planner'] },
  ];
  userMenuItems: MenuItem[] = [
    { label: 'Profile', routerLink: ['/app/profile'] },
    { separator: true },
  ];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    // This is intentionally empty
  }

}
