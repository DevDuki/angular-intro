import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import { ShoppingListService } from '../../../shared/services/shopping-list.service';
import { Ingridient } from '../../../shared/models/ingridient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe!: Recipe;
  isDropdownOpen: boolean = false;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  addIngridientsToShoppingList(): void {
      this.shoppingListService.addIngridients(this.recipe.ingridients);
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
