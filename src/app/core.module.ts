import {NgModule} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthIntercept} from "./auth/auth-intercept";

@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthIntercept,
    multi: true
  }]
})
export class CoreModule {

}
