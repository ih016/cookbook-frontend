import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../lib/auth/auth.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  loginWithRedirect(): void {
    // this.auth.loginWithRedirect({
    //   appState: {
    //     target: '/app/home',
    //   }
    // });
    this.auth.login();
  }

}
