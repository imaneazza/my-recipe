import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {DataStorageService} from "../services/data-storage.service";
import {Observable} from "rxjs";
import {RecipeService} from "../services/recipe.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorage: DataStorageService, private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot
    , state: RouterStateSnapshot):
    Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const recipeList = this.recipeService.getRecipes()
    if(recipeList.length==0)
    return this.dataStorage.fetchRecipes();
    else return recipeList
  }
}
