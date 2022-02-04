import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingridient } from "../../../shared/ingridient.model";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('itemName') itemName!: ElementRef;
  @ViewChild('itemAmount') itemAmount!: ElementRef;
  @Output() onAddItem: EventEmitter<Ingridient> = new EventEmitter<Ingridient>();

  constructor() { }

  ngOnInit(): void {
  }

  addItem(): void {
    this.onAddItem.emit({
      name: this.itemName.nativeElement.value,
      amount: this.itemAmount.nativeElement.value
    })
  }
}
