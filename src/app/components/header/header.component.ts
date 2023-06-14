import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {

  constructor(private router: Router, protected authenticationService: AuthService) {
  }

  ngOnInit(): void {
    // this.authenticationService.user$.subscribe({
    //   next(profile) {
    //     console.log(profile?['cookbookroles']:String)
    //   }
    // })
  }

  admin: boolean = false
  logo: string = `${environment.cdn}/logo/logo_blk.svg`

  mobileMenuOptions: MenuItem[] = [
    { label: 'Recipes', routerLink: ['/app/recipes'] },
    { label: 'Ingredients', routerLink: ['/app/ingredients'] },
    { label: 'Shopping Lists', routerLink: ['/app/shopping'], visible: this.admin },
    { label: 'Mealplanner', routerLink: ['/app/planner'], visible: this.admin },
    { separator: true },
    { label: 'Profile', routerLink: ['/app/profile'] },
    { label: 'Logout', command: (onclick) => { this.authenticationService.logout() } },
  ];

  bigMenuOptions: MenuItem[] = [
    { label: 'Recipes', routerLink: ['/app/recipes'] },
    { label: 'Ingredients', routerLink: ['/app/ingredients'] },
    { label: 'Shopping Lists', routerLink: ['/app/shopping'], visible: this.admin },
    { label: 'Mealplanner', routerLink: ['/app/planner'], visible: this.admin },
  ];
  userMenuItems: MenuItem[] = [
    { label: 'Profile', routerLink: ['/app/profile'] },
    { separator: true },
    { label: 'Logout', command: (onclick) => {this.authenticationService.logout()} },
  ];
}
