import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "./recipe.service";
import {map, tap} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {Recipe} from "../recipe/recipe.model";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private URL_LINK = "https://recipemanagement-2023-default-rtdb.firebaseio.com/"

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
  }

  storeRecipe() {
    const recipe = this.recipeService.getRecipes();
    this.http.put(this.URL_LINK + 'recipes.json', recipe).subscribe(res => console.log(res))

  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.URL_LINK + 'recipes.json').pipe(
      map(recipes => {
        return recipes.map(rec => {
          return {
            ...rec,
            ingredients: rec.ingredients ? rec.ingredients : []
          }
        })
      }),
      tap(recipe => {
        this.recipeService.setrecipes(recipe)
      })
    )

  }
}
