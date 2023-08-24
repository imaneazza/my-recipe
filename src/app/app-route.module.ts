import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [

  {path: '', redirectTo: 'recipe', pathMatch: 'full'},
  {path: 'recipe', loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule)},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'shopping', loadChildren: () => import('./shopping/shopping.module').then(m => m.ShoppingModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRouteModule {
}
