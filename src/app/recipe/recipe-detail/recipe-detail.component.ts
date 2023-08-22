import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/services/shopping.service';
import {ActivatedRoute, Router} from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipeselected: Recipe;
  id:number
  constructor(
    private shoppingService: ShoppingListService,
    private route: ActivatedRoute,
    private router:Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.id = param['id'];
      this.recipeselected = this.recipeService.getRecipe(this.id);
    });
  }
  addtoList() {
    this.shoppingService.addListIngredients(this.recipeselected.ingredients);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['recipe'])
  }
}
