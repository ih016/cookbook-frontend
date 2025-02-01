import { Component, OnInit } from '@angular/core';
import { Recipe, RestService } from '../../lib/rest/rest.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../lib/auth/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { LatestRecipesComponent } from 'src/app/components/latest-recipes/latest-recipes.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    LatestRecipesComponent,
  ]
})
export class HomeComponent implements OnInit {
  allRecipes: Recipe[] = [];
  user$!: Observable<User | null>;

  constructor(private restService: RestService, private messageService: MessageService, private authService: AuthService) {}

  welcomeText: string = ""

  ngOnInit(): void {
    this.user$ = this.authService.getUserData();
    this.restService.GetAllRecipes().then((data) => {
      this.allRecipes = data ;
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to retrieve recipes' });
    })
    this.welcome()
  }

  welcome() {
    let welcomeTypes: string[] = ['Good morning', 'Good afternoon', 'Good evening'];
    let hour = new Date().getHours();

    if (hour < 12) this.welcomeText = welcomeTypes[0];
    else if (hour < 18) this.welcomeText = welcomeTypes[1];
    else this.welcomeText = welcomeTypes[2];
  }

}
