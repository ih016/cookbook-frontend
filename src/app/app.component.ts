import { Component, OnInit } from '@angular/core';
import { AuthService } from './lib/auth/auth.service';
import { User } from './models/user';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet,
  ]
})
export class AppComponent implements OnInit {
  title = 'app-root';
  isAuthenticated = false;
  user: User | null = null;

  constructor(private authService: AuthService, private oidcSecurityService: OidcSecurityService) { }

  ngOnInit() {
    // this.primengConfig.ripple = true;
    this.authService.initializeAuthentication().subscribe(({ isAuthenticated }) => {
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
