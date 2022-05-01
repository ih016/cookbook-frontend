import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private oidcSecurityService: OidcSecurityService, private router: Router) { }

  logout() {
    this.oidcSecurityService.logoff();
    this.router.navigate(['logged-out']);
  }

}
