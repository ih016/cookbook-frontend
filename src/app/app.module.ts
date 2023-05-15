// Setup
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './router/app-routing.module';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// REST AUTH
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

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
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { ChipsModule } from 'primeng/chips';
import { FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';

// Components
import { AppComponent } from './app-component/app.component';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { LogoffComponent } from './logoff/logoff.component';
import { CookbookComponent } from './cookbook/cookbook.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './home/home.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { MealPlannerComponent } from './meal-planner/meal-planner.component';
import { CreateIngredientComponent } from './create-ingredient/create-ingredient.component';
import { IngredientEditorComponent } from './features/ingredient-editor/ingredient-editor.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';


@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    HeaderComponent,
    SplashscreenComponent,
    CookbookComponent,
    RecipeDetailComponent,
    IngredientsComponent,
    ShoppingListComponent,
    MealPlannerComponent,
    RecipeEditComponent,
    CreateIngredientComponent,
    IngredientEditorComponent,
    RecipeCreateComponent,
    HomeComponent,
    LogoffComponent,
    ProfileComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      ...env.auth0,
      httpInterceptor: {
        allowedList: [`${env.backend}/api/v1/*`],
      },
    }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
    TieredMenuModule,
    TableModule,
    DialogModule,
    EditorModule,
    ChipsModule,
    FileUploadModule,
    AvatarModule,
    CardModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
