import { Component, OnInit } from '@angular/core';
import { Ingridient } from "../../shared/models/ingridient.model";
import { ShoppingListService } from '../../shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingridients!: Ingridient[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingridients = this.shoppingListService.getIngridients();
    this.shoppingListService.ingridientsChanged
      .subscribe((ingridients: Ingridient[]) => this.ingridients = ingridients)
  }
}
