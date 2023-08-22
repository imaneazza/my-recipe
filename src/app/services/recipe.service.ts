import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipe/recipe.model';
import { Ingredients } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping.service';
import { Subject } from 'rxjs';
@Injectable({
    providedIn:'root'
})
export class RecipeService {
  recipeChanges:Subject<Recipe[]> =new Subject<Recipe[]>()
  private recipes :Recipe[] = []
  //   private recipes: Recipe[] = [
  //   new Recipe(
  //     'my new Recipe',
  //     'test desc',
  //     'https://hips.hearstapps.com/hmg-prod/images/easy-dinner-recipes-1676057761.jpeg?crop=1.00xw:0.502xh;0,0.229xh&resize=1200:*',
  //     [new Ingredients('meat',1), new Ingredients('fries',10)]
  //   ),
  //   new Recipe(
  //     'my pizza',
  //     'test pizza ',
  //     'https://img.freepik.com/photos-gratuite/pepperoni-finement-tranche-est-garniture-pizza-populaire-dans-pizzerias-style-americain-isole-fond-blanc-nature-morte_639032-229.jpg?w=2000',
  //     [new Ingredients('meat',1), new Ingredients('buns',4)]
  //   ),
  // ];
  constructor(){

  }
  getRecipes():Recipe[]{
    return this.recipes.slice()
  }

  getRecipe(id){
    return this.recipes.slice()[id]
  }

  addrecipe(recipe){
    this.recipes.push(recipe)
    this.recipeChanges.next(this.recipes.slice())
  }
  updaterecipe(recipe,index){
    this.recipes[index]= recipe
    this.recipeChanges.next(this.recipes.slice())
  }
  deleteRecipe(index){
    this.recipes.splice(index,1)
    this.recipeChanges.next(this.recipes.slice())

  }
  setrecipes(recipes:Recipe[]){
    this.recipes = recipes;
    this.recipeChanges.next(recipes)
  }
}
