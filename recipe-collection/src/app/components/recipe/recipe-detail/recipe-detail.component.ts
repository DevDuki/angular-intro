import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {Recipe} from "../recipe.model";
import { ShoppingListService } from '../../../shared/services/shopping-list.service';
import { Ingridient } from '../../../shared/models/ingridient.model';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../../../shared/services/recipe.service';
// @ts-ignore
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe!: Recipe;
  isDropdownOpen: boolean = false;
  routeSubscription!: Subscription;

  constructor(private shoppingListService: ShoppingListService,
              private recipeService: RecipeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((updatedParams: Params) => {
      this.recipe = this.recipeService.getRecipe(updatedParams['id'])
    })
  }

  addIngridientsToShoppingList(): void {
      this.shoppingListService.addIngridients(this.recipe.ingridients);
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  deleteRecipe() {
    // @ts-ignore
    this.recipeService.deleteRecipe(this.recipe.id)
  }
}
