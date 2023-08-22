import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShoppingListComponent} from './shopping/shopping-list/shopping-list.component';
import {RecipeComponent} from './recipe/recipe.component';
import {NoRecipeComponent} from './recipe/no-recipe/no-recipe.component';
import {RecipeDetailComponent} from './recipe/recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from './recipe/recipe-edit/recipe-edit.component';
import {RecipeResolverService} from "./recipe/recipe-resolver.service";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  {
    path: 'recipe', component: RecipeComponent,
    canActivate:[AuthGuard],
    children: [
      {path: '', component: NoRecipeComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService]},
    ]
  },
  {path: '', redirectTo: 'recipe', pathMatch: 'full'},
  {path: 'shopping', component: ShoppingListComponent},
  {path: 'auth', component: AuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouteModule {
}
