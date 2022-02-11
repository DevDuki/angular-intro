import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../../components/recipe/recipe.model';
import { Ingridient } from '../models/ingridient.model';
// @ts-ignore
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      0,
      'Test Recipe',
      'Test desc',
      'http://pngimg.com/uploads/spaghetti/spaghetti_PNG17.png',
      [new Ingridient('Apple', 2), new Ingridient('Spaghetti', 100)]
    ),
    new Recipe(
      1,
      'Test Recipe2',
      'Test desc2',
      'http://pngimg.com/uploads/spaghetti/spaghetti_PNG17.png',
      [new Ingridient('Apple', 90), new Ingridient('Spaghetti', 112)]
    )
  ]

  constructor() { }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    // @ts-ignore
    return this.recipes.find((recipe: Recipe) => recipe.id === +id)
  }
}
