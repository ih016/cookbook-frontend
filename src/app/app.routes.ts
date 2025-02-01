import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CallbackModule } from './features/callback/callback.module';
import { AuthGuard } from './lib/auth/auth.guard';
import { CookbookComponent } from './cookbook/cookbook.component';
import { SplashscreenComponent } from './screens/splashscreen/splashscreen.component';
import { RecipeDetailComponent } from './screens/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './screens/recipe-edit/recipe-edit.component';
import { IngredientsComponent } from './screens/ingredients/ingredients.component';
import { ShoppingListComponent } from './screens/shopping-list/shopping-list.component';
import { MealPlannerComponent } from './screens/meal-planner/meal-planner.component';
import { HomeComponent } from './screens/home/home.component';
// import { LogoffComponent } from '../../screens/logoff/logoff.component';
import { ProfileComponent } from './screens/profile/profile.component';
import { RecipeBrowserComponent } from 'src/app/screens/recipe-browser/recipe-browser.component';

export const routes: Routes = [
  {
    path: '',
    component: SplashscreenComponent,
  },
  {
    path: 'login',
    component: SplashscreenComponent,
  },
  // {
  //   path: 'callback',
  //   component: CallbackModule,
  // },
  {
    path: 'app',
    component: CookbookComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'recipes',
        component: RecipeBrowserComponent,
      },
      {
        path: 'recipes/:id',
        component: RecipeDetailComponent,
      },
      {
        path: 'recipes/:id/edit',
        component: RecipeEditComponent,
      },
      {
        path: 'ingredients',
        component: IngredientsComponent,
      },
      {
        path: 'shopping',
        component: ShoppingListComponent,
      },
      {
        path: 'planner',
        component: MealPlannerComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
