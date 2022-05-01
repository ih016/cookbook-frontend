import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  password: string = ""
  email: string = ""
  loginValid: boolean = true

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login();
  }

}
