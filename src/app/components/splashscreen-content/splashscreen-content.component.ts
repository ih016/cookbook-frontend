import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-splashscreen-content',
  templateUrl: './splashscreen-content.component.html',
  styleUrls: ['./splashscreen-content.component.scss']
})
export class SplashscreenContentComponent implements OnInit {

  logo: string = `${environment.cdn}/logo/logo_blk.svg`

  constructor() { }

  ngOnInit(): void {}


}
