import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../lib/auth/auth.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { RouterLink } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { TabMenuModule } from 'primeng/tabmenu';
import { AvatarModule } from 'primeng/avatar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [
        CommonModule,
        RouterLink,
        MenuModule,
        TabMenuModule,
        AvatarModule,
        TieredMenuModule,
    ]
})

export class HeaderComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(protected authService: AuthService) {
  }

  ngOnInit(): void {
    this.user$ = this.authService.getUserData();
    console.log(this.user$)
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
    { label: 'Logout', command: (onclick) => { this.authService.logout() } },
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
    { label: 'Logout', command: (onclick) => {this.authService.logout()} },
  ];
}
