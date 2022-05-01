import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Ingredient {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface IngredientAmount {
  recipeid: number;
  ingredientid: number;
  amount: number;
  unit: string;
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  method: string;
  preptime: number;
  cooktime: number;
  persons: number;
  ingredients: Array<Ingredient>;
  ingredientamounts: Array<IngredientAmount>;
  tags: Array<Tag>;
}

@Injectable({
  providedIn: 'root'
})
export class RestService {
  baseURL: string = environment.baseURL;

  constructor(private http: HttpClient, private oidcSecurityService: OidcSecurityService) { }

  get<Type>(url: string): Promise<Type> {
    return new Promise((success) => {
      //this.http.get<Type>(`${this.baseURL}/${url}`).subscribe((response: Type) => {
      //  success(response);
      //});
      this.oidcSecurityService.getAccessToken().subscribe((token) => {
        const httpOptions = {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        };
        this.http.get<Type>(`${this.baseURL}/${url}`, httpOptions).subscribe((response: Type) => {
          success(response);
        })
      });
    });
  }
}

