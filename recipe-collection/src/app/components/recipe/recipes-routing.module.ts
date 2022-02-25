import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../../auth/auth.guard';
import { NoRecipeChosenComponent } from './no-recipe-chosen/no-recipe-chosen.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesResolver } from '../../shared/resolvers/recipes.resolver';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: NoRecipeChosenComponent },
      { path: 'add', component: EditRecipeComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolver] },
      { path: ':id/edit', component: EditRecipeComponent, resolve: [RecipesResolver] },
    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
