import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  constructor(private oidcSecurityService: OidcSecurityService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.oidcSecurityService.isAuthenticated$.pipe(
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          this.oidcSecurityService.authorize(); // Redirect to Keycloak login
          return false;
        }
        return true;
      })
    );
  }
}
