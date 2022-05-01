import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
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
          this.router.navigate(['login']);
          success(false);
        }
        success(true);
      })
    })
  }
}
