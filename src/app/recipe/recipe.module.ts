import {NgModule} from "@angular/core";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeItemComponent} from "./recipe-item/recipe-item.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeComponent} from "./recipe.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RecipeRoutingModule} from "./recipe-routing.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [RecipeRoutingModule, SharedModule, ReactiveFormsModule],
  declarations: [
    RecipeListComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    RecipeDetailComponent,
    RecipeComponent],


})
export class RecipeModule {

}
