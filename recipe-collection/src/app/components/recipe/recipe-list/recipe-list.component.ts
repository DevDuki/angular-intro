import { Component, OnDestroy, OnInit } from '@angular/core';
import {Recipe} from "../recipe.model";
import { RecipeService } from '../../../shared/services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeSubscription!: Subscription;
  recipes: Recipe[] = [];
  src!: string;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipeSubscription = this.recipeService.recipesUpdated
      .subscribe((newRecipes: Recipe[]) => {
        this.recipes = newRecipes;
      });
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }
}
