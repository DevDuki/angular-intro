import { Component, OnInit } from '@angular/core';
import {Recipe} from "./recipe.model";
import { RecipeService } from '../../shared/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  recipeToShowDetails?: Recipe;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe((selectedRecipe: Recipe) => {
      this.recipeToShowDetails = selectedRecipe
    })
  }
}
