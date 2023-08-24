import {NgModule} from "@angular/core";
import {AlertComponent} from "./alert-comp/alert.component";
import {LoadingComponent} from "./loading/loading.component";
import {PlaceholderDirective} from "./placeHolder/placeholder.directive";
import {DropdownDirective} from "./dropdown.directive";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [AlertComponent, LoadingComponent, PlaceholderDirective, DropdownDirective],
  exports: [AlertComponent, FormsModule, LoadingComponent, PlaceholderDirective, DropdownDirective, CommonModule],
  imports: [CommonModule, FormsModule]
})
export class SharedModule {

}
