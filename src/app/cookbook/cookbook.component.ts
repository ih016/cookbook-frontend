import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.scss'],
  providers: [MessageService]
})
export class CookbookComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
