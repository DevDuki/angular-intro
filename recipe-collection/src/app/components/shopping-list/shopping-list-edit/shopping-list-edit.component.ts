import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingridient } from "../../../shared/models/ingridient.model";
import { ShoppingListService } from '../../../shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('itemName') itemName!: ElementRef;
  @ViewChild('itemAmount') itemAmount!: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  addItem(): void {
    const newIngridient = new Ingridient(this.itemName.nativeElement.value, this.itemAmount.nativeElement.value)
    this.shoppingListService.addIngridient(newIngridient);
  }
}
