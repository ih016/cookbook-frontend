import { Component, OnInit } from '@angular/core';
import { UserDataResult, OidcSecurityService } from 'angular-auth-oidc-client';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile!: UserDataResult

  constructor(private oidcSecurityService: OidcSecurityService) {
    this.oidcSecurityService.userData$.subscribe((data) => this.profile = data);
  }

  ngOnInit(): void {
    // This is intentionally empty
  }

  getDate(time: number) {
    return new Date(time)
  }

}
