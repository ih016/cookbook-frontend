import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './router/app-routing.module';
import { AppComponent } from './app-component/app.component';
import { AuthConfigModule } from './lib/auth/auth-config.module';
import { RecipesComponent } from './recipes/recipes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LoggedOutComponent } from './logged-out/logged-out.component';
import { HeaderComponent } from './header/header.component';

// REST AUTH
import { AuthInterceptor } from 'angular-auth-oidc-client';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// UI Components
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { TabMenuModule } from 'primeng/tabmenu';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { CookbookComponent } from './cookbook/cookbook.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { IngredientsComponent } from './ingredients/ingredients.component';


@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    LoggedOutComponent,
    HeaderComponent,
    SplashscreenComponent,
    CookbookComponent,
    RecipeDetailComponent,
    IngredientsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthConfigModule,
    FormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    RadioButtonModule,
    SplitButtonModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule,
    ToastModule,
    MenuModule,
    TabMenuModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
