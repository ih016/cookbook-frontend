import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private oidcSecurityService: OidcSecurityService) {}

  // Initialize authentication and handle the callback
  initializeAuthentication(): Observable<{ isAuthenticated: boolean }> {
    return this.oidcSecurityService.checkAuth().pipe(
      tap(({ isAuthenticated }) => {
        console.log('checkAuth completed, isAuthenticated:', isAuthenticated);

        if (!isAuthenticated) {
          console.warn('User is not authenticated. Trying silent renew...');
          this.oidcSecurityService.forceRefreshSession().subscribe({
            next: () => console.log('Silent renew successful'),
            error: (err) => console.error('Silent renew failed', err),
          });
        }
      })
    );
  }

  startSilentRenew() {
    this.oidcSecurityService.checkAuthIncludingServer().subscribe(({ isAuthenticated }) => {
      console.log('Silent renew completed, user authenticated:', isAuthenticated);
    });
  }

  // Login
  login(): void {
    this.oidcSecurityService.authorize();
  }

  // Logout
  logout(): void {
    this.oidcSecurityService.logoff();
  }

  // Retrieve user data
  getUserData(): Observable<User | null> {
    return this.oidcSecurityService.userData$.pipe(
      map((userData: any) => {
        if (userData && userData.userData) {
          return {
            sub: userData.userData.sub,
            name: userData.userData.name,
            email: userData.userData.email,
            picture: userData.userData.picture,
            ...userData.userData,
          } as User;
        }
        return null
      })
    );
  }

  // Retrieve access token
  getAccessToken(): Observable<string> {
    return this.oidcSecurityService.getAccessToken();
  }
}
