import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "./recipe.service";
import { Recipe } from "../../components/recipe/recipe.model";
import { map, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private baseUrl: string = 'https://recipe-collection-44eda-default-rtdb.europe-west1.firebasedatabase.app/';

  constructor(private http: HttpClient,
              private recipeService: RecipeService) { }

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.baseUrl + '/recipes.json', recipes)
      .subscribe((res) => {
        console.log(res)
      })
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.baseUrl + '/recipes.json')
      .pipe(
        map((recipes: Recipe[]) => {
          return recipes.map((recipe: Recipe) => {
            return {
              ...recipe,
              ingridients: recipe.ingridients ? recipe.ingridients : []
            }
          })
        }),
        tap((recipes: Recipe[]) => this.recipeService.setRecipes(recipes))
      )
  }
}
