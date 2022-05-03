import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../lib/auth/auth.guard';
import { CookbookComponent } from '../cookbook/cookbook.component';
import { LoggedOutComponent } from '../logged-out/logged-out.component';
import { RecipesComponent } from '../recipes/recipes.component';
import { SplashscreenComponent } from '../splashscreen/splashscreen.component';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { IngredientsComponent } from '../ingredients/ingredients.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { MealPlannerComponent } from '../meal-planner/meal-planner.component';

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
