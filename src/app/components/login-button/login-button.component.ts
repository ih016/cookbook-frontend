import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../lib/auth/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login-button',
  standalone: true,
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss'],
  imports: [
    ButtonModule,
  ]
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
