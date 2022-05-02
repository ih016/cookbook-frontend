import { Component } from '@angular/core';
import { AuthService } from '../lib/auth/auth.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.component.html',
  styleUrls: ['./splashscreen.component.scss']
})
export class SplashscreenComponent {
  password: string = ""
  email: string = ""
  loginValid: boolean = true

  constructor(private authService: AuthService, private oidcSecurityService: OidcSecurityService) { }

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken, idToken }) => {
      /*...*/
    });
  }

  login() {
    this.authService.login();
  }

  

}
