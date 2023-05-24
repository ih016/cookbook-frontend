import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    // This is intentionally empty
  }

  getDate(time: number) {
    return new Date(time)
  }

}
