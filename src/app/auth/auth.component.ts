import {Component, ComponentFactoryResolver, OnDestroy, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared/alert-comp/alert.component";
import {PlaceholderDirective} from "../shared/placeHolder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html'

})
export class AuthComponent implements OnDestroy{
  isLoginmode = true;
  error: string
  isLoading = false;
  @ViewChild(PlaceholderDirective, {static: true}) alertHosting: PlaceholderDirective
  closeSub: Subscription

  constructor(private authService: AuthService, private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  onSwitchMode() {
    this.isLoginmode = !this.isLoginmode
  }

  onSubmitData(formData: NgForm) {
    console.log(formData.value);
    if (formData.valid) {
      const email = formData.value.email;
      const password = formData.value.password;
      this.isLoading = true
      let obs: Observable<any>;
      if (this.isLoginmode) {
        obs = this.authService.signIn(email, password)
      } else {
        obs = this.authService.signUp(email, password)
      }
      obs.subscribe(data => {
        this.isLoading = false
        console.log(data);
        this.router.navigate(['/recipe'])
      }, err => {
        console.log(err);
        this.showErrorAlert(err)
        this.isLoading = false

      })

      formData.reset()
    }

  }

  close() {
    this.error = null;
  }

  private showErrorAlert(error: string) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const host = this.alertHosting.viewContainerRef;
    host.clear();

    const compref = host.createComponent(factory);
    compref.instance.message = error
    this.closeSub = compref.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      host.clear()
    })

  }
  ngOnDestroy() {
    if(this.closeSub){
      this.closeSub.unsubscribe()
    }
  }
}
