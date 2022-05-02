import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../lib/auth/auth.guard';
import { CookbookComponent } from '../cookbook/cookbook.component';
import { LoggedOutComponent } from '../logged-out/logged-out.component';
import { RecipesComponent } from '../recipes/recipes.component';
import { SplashscreenComponent } from '../splashscreen/splashscreen.component';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SplashscreenComponent,
  },
  {
    path: 'app',
    component: CookbookComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'recipes',
        component: RecipesComponent,
      },
      {
        path: 'recipes/:id',
        component: RecipeDetailComponent,
      },
    ],
  },
  {
    path: 'logged-out',
    component: LoggedOutComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
