import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  key_api = 'AIzaSyDWlbeYPdwsd0IpJ4SZmHiuHQSH8hiiUgs'
  url_auth = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
  url_login = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
  timeOutLogin: any;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  signUp(email: string, password: string) {
    return this.http.post(this.url_auth + this.key_api, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap((data: any) => {
        this.handleUser(data.email, data.localId, data.idToken, data.expiresIn)
      })
    )
  }

  logout() {
    this.user.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem('userdata')
    if (this.timeOutLogin) {
      clearTimeout(this.timeOutLogin)
    }
  }
  autologout(expiration: number) {
    this.timeOutLogin = setTimeout(() => {
      this.logout()
    }, expiration)
  }
  autoLogin() {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    if (!userdata) {
      return;
    }
    let newUser = new User(userdata.email, userdata.id, userdata._token, new Date(userdata._tokenExpiration))
    if (newUser.token){
      this.user.next(newUser)
      const expiration = new Date(userdata._tokenExpiration).getTime() - new Date().getTime()
      this.autologout(expiration)
    }

  }

  signIn(email: string, password: string) {
    return this.http.post(this.url_login + this.key_api, {
      email, password, returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap((data: any) => {
        this.handleUser(data.email, data.localId, data.idToken, data.expiresIn)
      })
    )
  }

  private handleUser(email: string, localId: string, idToken: string, expiresIn: number) {
    const expiration = new Date(new Date().getTime() + (expiresIn * 1000))
    const userData = new User(email, localId, idToken, expiration)
    this.user.next(userData);
    this.autologout(expiresIn*1000)
    localStorage.setItem('userdata', JSON.stringify(userData))

  }

  private handleError(errorMessage: HttpErrorResponse) {
    let error = 'An error Occured'
    console.log(errorMessage.error)
    if (!errorMessage.error || !errorMessage.error.error)
      return throwError(errorMessage)
    switch (errorMessage.error.error.message) {
      case "EMAIL_EXISTS":
        error = 'The email address is already in use by another account.';
        break
      case "OPERATION_NOT_ALLOWED":
        error = 'Password sign-in is disabled for this project.';
        break
      case "EMAIL_NOT_FOUND":
        error = 'There is no user record corresponding to this identifier. The user may have been deleted.';
        break
    }
    return throwError(error)
  }
}
