import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping.service';
import { Ingredients } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  currentItem: Ingredients;
  subscription: Subscription;
  modeEdit = false;
  currentIndex: number;
  @ViewChild('formShopping') formChild: NgForm;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index) => {
        this.modeEdit = true;
        this.currentItem = this.shoppingListService.getIngredient(index);
        this.currentIndex = index;
        this.formChild.setValue({
          name: this.currentItem.name,
          amount: this.currentItem.amount,
        });
      }
    );
  }
  onAddItem(form: NgForm) {
    const value = form.value;
    if (this.modeEdit) {
      this.shoppingListService.EditIngedient(
        new Ingredients(value.name, value.amount),
        this.currentIndex
      );
    } else {
      this.shoppingListService.addIngedient(
        new Ingredients(value.name, value.amount)
      );
    }
    this.resetForm();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }
  resetForm() {
    this.modeEdit = false;
    this.currentIndex = null;
    this.currentItem = null;
    this.formChild.reset();
  }
  deleteItem() {
    this.shoppingListService.deleteIngredient(this.currentIndex);
    this.resetForm()
  }
}
