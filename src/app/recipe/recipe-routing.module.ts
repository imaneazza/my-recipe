import {NgModule} from "@angular/core";
import {RecipeComponent} from "./recipe.component";
import {AuthGuard} from "../auth/auth.guard";
import {NoRecipeComponent} from "./no-recipe/no-recipe.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeResolverService} from "./recipe-resolver.service";
import {RouterModule} from "@angular/router";
const routes= [{
  path: '', component: RecipeComponent,
  canActivate:[AuthGuard],
  children: [
    {path: '', component: NoRecipeComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
    {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService]},
  ]
}]
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
  })
export class RecipeRoutingModule {

}
