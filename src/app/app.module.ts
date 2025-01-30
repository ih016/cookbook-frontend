// Setup
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './lib/router/app-routing.module';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// REST AUTH
import { environment as env } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiModule } from './lib/api-client';
import { AuthInterceptor } from './lib/auth/auth.interceptor';

// UI Components
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SidebarModule } from 'primeng/sidebar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { TabMenuModule } from 'primeng/tabmenu';
import { TagModule } from 'primeng/tag';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TableModule } from 'primeng/table';

// Components
import { AppComponent } from './app-component/app.component';
import { SplashscreenComponent } from './screens/splashscreen/splashscreen.component';
import { CookbookComponent } from './cookbook/cookbook.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './screens/home/home.component';
import { RecipesGridComponent } from './components/recipe-grid/recipe-grid.component';
import { RecipeDetailComponent } from './screens/recipe-detail/recipe-detail.component';
import { RecipeCreateComponent } from './components/recipe-create/recipe-create.component';
import { RecipeEditComponent } from './screens/recipe-edit/recipe-edit.component';
import { IngredientsComponent } from './screens/ingredients/ingredients.component';
import { ShoppingListComponent } from './screens/shopping-list/shopping-list.component';
import { MealPlannerComponent } from './screens/meal-planner/meal-planner.component';
import { CreateIngredientComponent } from './components/create-ingredient/create-ingredient.component';
import { IngredientEditorComponent } from './components/ingredient-editor/ingredient-editor.component';
import { ProfileComponent } from './screens/profile/profile.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { FilteringSidebarComponent } from './components/filtering-sidebar/filtering-sidebar.component';
import { RecipeBrowserComponent } from './screens/recipe-browser/recipe-browser.component';
import { LatestRecipesComponent } from './components/latest-recipes/latest-recipes.component';
import { IngredientListComponent } from './components/ingredient-list/ingredient-list.component';
import { SplashscreenContentComponent } from './components/splashscreen-content/splashscreen-content.component';
import { AuthService } from './lib/auth/auth.service';
import { access } from 'fs';



@NgModule({
  declarations: [
    AppComponent,
    RecipesGridComponent,
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
    ProfileComponent,
    LoginButtonComponent,
    FilteringSidebarComponent,
    RecipeBrowserComponent,
    LatestRecipesComponent,
    IngredientListComponent,
    SplashscreenContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      config: {
        authority: `${env.oidc.domain}`,
        redirectUrl: `${env.baseURL}/oidc/callback`,
        postLoginRoute: '/app/home',
        secureRoutes: [env.backend],
        postLogoutRedirectUri: '/loggedout',
        clientId: `${env.oidc.clientId}`,
        scope: 'openid profile email offline_access',
        responseType: 'code',
        silentRenew: true,
        silentRenewUrl: `${env.baseURL}/oidc/silent-renew`,
        useRefreshToken: true,
        renewTimeBeforeTokenExpiresInSeconds: 60,
        logLevel: LogLevel.Debug,
      },
    }),
    AvatarModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,
    CarouselModule,
    ChipModule,
    DialogModule,
    DropdownModule,
    EditorModule,
    FileUploadModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    MenuModule,
    MultiSelectModule,
    ReactiveFormsModule,
    RadioButtonModule,
    SidebarModule,
    SplitButtonModule,
    TableModule,
    TagModule,
    TabMenuModule,
    TieredMenuModule,
    ToastModule,
    ApiModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
