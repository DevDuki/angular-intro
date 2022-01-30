import { Component, OnInit } from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Test Recipe', 'Test desc', 'http://pngimg.com/uploads/spaghetti/spaghetti_PNG17.png')
  ]
  src!: string;

  constructor() { }

  ngOnInit(): void {
  }

  showSrc() {
    console.log(this.src)
  }
}
