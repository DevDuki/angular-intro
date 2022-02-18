import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './components/recipe/recipes.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './components/recipe/recipe-detail/recipe-detail.component';
import { NoRecipeChosenComponent } from './components/recipe/no-recipe-chosen/no-recipe-chosen.component';
import { EditRecipeComponent } from './components/recipe/edit-recipe/edit-recipe.component';
import { RecipesResolver } from "./shared/resolvers/recipes.resolver";
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: NoRecipeChosenComponent },
      { path: 'add', component: EditRecipeComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolver] },
      { path: ':id/edit', component: EditRecipeComponent, resolve: [RecipesResolver] },
    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
