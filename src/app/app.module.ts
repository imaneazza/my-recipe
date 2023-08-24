import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './header/header.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AppRouteModule} from './app-route.module';
import {HttpClientModule} from "@angular/common/http";
import {RecipeModule} from "./recipe/recipe.module";
import {ShoppingModule} from "./shopping/shopping.module";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";
import {AuthModule} from "./auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AppRouteModule,
    CoreModule,
    HttpClientModule],

  bootstrap: [AppComponent],
})
export class AppModule {
}
