import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeListComponent } from './components/recipe/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './components/recipe/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './components/recipe/recipe-detail/recipe-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipesComponent } from './components/recipe/recipes.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './components/shopping-list/shopping-list-edit/shopping-list-edit.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { NoRecipeChosenComponent } from './components/recipe/no-recipe-chosen/no-recipe-chosen.component';
import { EditRecipeComponent } from './components/recipe/edit-recipe/edit-recipe.component';
import { RecipeService } from './shared/services/recipe.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    HeaderComponent,
    RecipesComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    DropdownDirective,
    NoRecipeChosenComponent,
    EditRecipeComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RecipeService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
