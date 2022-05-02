import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router) { }

  canActivate(): Promise<boolean> {
    return new Promise((success) => {
      this.authService.checkIfIsAuthenticated().then((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          this.router.navigate(['']);
          success(false);
        }
        success(true);
      })
    })
  }
}
