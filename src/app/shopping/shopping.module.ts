import {NgModule} from "@angular/core";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {ShoppingListEditComponent} from "./shopping-list-edit/shopping-list-edit.component";
import {ShoppingRoutingModule} from "./shopping-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [ShoppingRoutingModule, SharedModule, ReactiveFormsModule],
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent],
  exports: [ShoppingListEditComponent]
})
export class ShoppingModule {

}
