import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [AuthComponent],
  imports: [
    RouterModule.forChild([{path: '', component: AuthComponent}]),
    SharedModule],
  exports: [RouterModule]
})
export class AuthModule {

}
