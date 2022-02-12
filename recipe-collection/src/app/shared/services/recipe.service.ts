import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../../components/recipe/recipe.model';
import { Ingridient } from '../models/ingridient.model';
// @ts-ignore
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesUpdated: Subject<Recipe[]> = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Test Recipe',
      'Test desc',
      'http://pngimg.com/uploads/spaghetti/spaghetti_PNG17.png',
      [new Ingridient('Apple', 2), new Ingridient('Spaghetti', 100)],
      0,
    ),
    new Recipe(
      'Test Recipe2',
      'Test desc2',
      'http://pngimg.com/uploads/spaghetti/spaghetti_PNG17.png',
      [new Ingridient('Apple', 90), new Ingridient('Spaghetti', 112)],
      1,
    )
  ]

  constructor() { }

  getNextId(): number {
    return this.recipes.length
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    // @ts-ignore
    return this.recipes.find((recipe: Recipe) => {
      return recipe.id == parseInt(String(id))
    });
  }

  addRecipe(recipe: Recipe): void {
    if (recipe.id === undefined) {
      recipe.id = this.getNextId();
    }
    this.recipes.push(recipe);
    this.recipesUpdated.next(this.recipes.slice());
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    this.recipes = this.recipes.map((recipe: Recipe) => recipe.id === +id ? newRecipe : recipe);
    this.recipesUpdated.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipesUpdated.next(this.recipes.slice());
  }
}
