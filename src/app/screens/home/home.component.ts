import { Component, OnInit } from '@angular/core';
import { Recipe, RestService } from '../../lib/rest/rest.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allRecipes: Recipe[] = [];

  constructor(private restService: RestService, private messageService: MessageService, public authService: AuthService) {
    // This is intentionally empty
  }

  
  welcomeText: string = ""

  ngOnInit(): void {
    this.restService.GetAllRecipes().then((data) => {
      this.allRecipes = data ;
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to retrieve recipes' });
    })
  }

  welcome() {
    let welcomeTypes: string[] = ['Good morning', 'Good afternoon', 'Good evening'];
    let hour = new Date().getHours();

    if (hour < 12) this.welcomeText = welcomeTypes[0];
    else if (hour < 18) this.welcomeText = welcomeTypes[1];
    else this.welcomeText = welcomeTypes[2];
  }

}
