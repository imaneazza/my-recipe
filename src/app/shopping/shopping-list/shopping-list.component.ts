import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredients } from '../../shared/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit , OnDestroy{
  ingredients: Ingredients[];
  subscription:Subscription
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.updateList.subscribe(() => {
      this.ingredients = this.shoppingListService.getIngredients();
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index)
  }
}
