import {  Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  updateList: Subject<void> = new Subject<void>();
  startedEditing : Subject<number>=new Subject<number>()
  private ingredients: Ingredients[] = [
    new Ingredients('tomato', 5),
    new Ingredients('apple', 12),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(index) {
    return this.ingredients.slice()[index];
  }
  addIngedient(ingredient: Ingredients) {
    this.ingredients.push(ingredient);
    this.updateList.next();
  }
  EditIngedient(ingredient: Ingredients , index:number) {
    this.ingredients[index] = ingredient;
    this.updateList.next();
  }
  addListIngredients(ingredient: Ingredients[]){
    this.ingredients.push(...ingredient);
    this.updateList.next();
  }
  deleteIngredient(index:number){
   this.ingredients.splice(index,1)
    this.updateList.next();
  }
}
