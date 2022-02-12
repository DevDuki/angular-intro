import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingridient } from "../../../shared/models/ingridient.model";
import { ShoppingListService } from '../../../shared/services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingListForm') slForm!: NgForm;
  editingSubscription!: Subscription;
  editMode: boolean = false;
  editingItemIndex!: number;
  editingItem!: Ingridient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.editingSubscription = this.shoppingListService.startedEditing
      .subscribe((index: number) => {
        this.editMode = true;
        this.editingItemIndex = index;
        this.editingItem = this.shoppingListService.getIngridient(index);
        this.slForm.setValue({
          'name': this.editingItem.name,
          'amount': this.editingItem.amount
        })
      });
  }

  ngOnDestroy() {
    this.editingSubscription.unsubscribe();
  }

  addItem(): void {
    const { name, amount } = this.slForm.value
    const newIngridient = new Ingridient(name, amount)

    if (this.editMode) {
      this.shoppingListService.updateIngridient(this.editingItemIndex, newIngridient)
    } else {
      this.shoppingListService.addIngridient(newIngridient);
    }

    this.slForm.reset();
    this.editMode = false;
  }

  clearForm() {
    this.slForm.reset();
    this.editMode = false;
  }

  deleteItem() {
    this.shoppingListService.deleteIngridient(this.editingItemIndex);
    this.slForm.reset();
  }
}
