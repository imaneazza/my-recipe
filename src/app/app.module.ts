import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ShoppingListComponent} from './shopping/shopping-list/shopping-list.component';
import {ShoppingListEditComponent} from './shopping/shopping-list-edit/shopping-list-edit.component';
import {RecipeListComponent} from './recipe/recipe-list/recipe-list.component';
import {RecipeItemComponent} from './recipe/recipe-item/recipe-item.component';
import {RecipeDetailComponent} from './recipe/recipe-detail/recipe-detail.component';
import {HeaderComponent} from './header/header.component';
import {RecipeComponent} from './recipe/recipe.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AppRouteModule} from './app-route.module';
import {RecipeEditComponent} from "./recipe/recipe-edit/recipe-edit.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthComponent} from "./auth/auth.component";
import {LoadingComponent} from "./shared/loading/loading.component";
import {AuthIntercept} from "./auth/auth-intercept";
import {AlertComponent} from "./shared/alert-comp/alert.component";
import {PlaceholderDirective} from "./shared/placeHolder/placeholder.directive";

@NgModule({
  declarations: [
    AppComponent,
    RecipeEditComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    HeaderComponent,
    RecipeComponent,PlaceholderDirective,
    DropdownDirective,AlertComponent,
    PageNotFoundComponent, AuthComponent, LoadingComponent
  ],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule,
    AppRouteModule, HttpClientModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthIntercept,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
