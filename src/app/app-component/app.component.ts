import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from '../lib/auth/auth.service'
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { User } from '../models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  
})
export class AppComponent implements OnInit {
  title = 'cookbook-frontend';
  isAuthenticated = false;
  user: User | null = null;

  constructor(private primengConfig: PrimeNGConfig, private authService: AuthService, private oidcSecurityService: OidcSecurityService) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.authService.getUserData().subscribe((userData: User | null) => {
          this.user = userData;
        });
      }
    });
    this.authService.startSilentRenew();
  }
}
