import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HeaderComponent } from '../components/header/header.component';
import { ToastModule } from 'primeng/toast';
import { RouterOutlet } from '@angular/router'

@Component({
    selector: 'app-cookbook',
    templateUrl: './cookbook.component.html',
    styleUrls: ['./cookbook.component.scss'],
    providers: [MessageService],
    imports: [
        HeaderComponent,
        ToastModule,
        RouterOutlet,
    ]
})
export class CookbookComponent implements OnInit {

  constructor() {
    // This is intentionally empty
  }

  ngOnInit(): void {
     // This is intentionally empty
  }

}
