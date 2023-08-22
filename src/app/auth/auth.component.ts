import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html'

})
export class AuthComponent {
  isLoginmode = true;
  error:string
  isLoading =false;
  constructor(private authService:AuthService, private router:Router) {
  }

  onSwitchMode() {
    this.isLoginmode = !this.isLoginmode
  }
  onSubmitData(formData:NgForm){
    console.log(formData.value);
    if(formData.valid){
      const email =formData.value.email;
      const password =formData.value.password;
      this.isLoading =true
      let obs:Observable<any>;
      if(this.isLoginmode){
       obs = this.authService.signIn(email,password)
      }else {
        obs= this.authService.signUp(email,password)
      }
      obs.subscribe(data=>{
        this.isLoading = false
        console.log(data);
        this.router.navigate(['/recipe'])
      }, err=>{
        console.log(err);
        this.error = err
        this.isLoading=false

      })

      formData.reset()
    }

  }

}
