import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginButtonComponent } from 'src/app/components/login-button/login-button.component';

@Component({
    selector: 'app-splashscreen-content',
    standalone: true,
    templateUrl: './splashscreen-content.component.html',
    styleUrls: ['./splashscreen-content.component.scss'],
    imports: [
        LoginButtonComponent,
    ]
})
export class SplashscreenContentComponent implements OnInit {

  logo: string = `${environment.cdn}/logo/logo_blk.svg`

  constructor() { }

  ngOnInit(): void {}


}
