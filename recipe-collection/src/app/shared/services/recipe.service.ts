import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../../components/recipe/recipe.model';
import { Ingridient } from '../models/ingridient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Test Recipe',
      'Test desc',
      'http://pngimg.com/uploads/spaghetti/spaghetti_PNG17.png',
      [new Ingridient('Apple', 2), new Ingridient('Spaghetti', 100)]
    ),
    new Recipe(
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
}
