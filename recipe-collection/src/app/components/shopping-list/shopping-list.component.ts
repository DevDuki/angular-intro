import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingridient } from "../../shared/models/ingridient.model";
import { ShoppingListService } from '../../shared/services/shopping-list.service';
// @ts-ignore
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingridients!: Ingridient[];
  private ingridientsChangedSub!: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingridients = this.shoppingListService.getIngridients();
    this.ingridientsChangedSub = this.shoppingListService.ingridientsChanged
      .subscribe((ingridients: Ingridient[]) => this.ingridients = ingridients)
  }

  ngOnDestroy() {
    this.ingridientsChangedSub.unsubscribe();
  }
}
