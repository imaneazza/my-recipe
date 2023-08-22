import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../services/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  isLogged: boolean = false

  constructor(private storeService: DataStorageService, private authService: AuthService) {
  }

  ngOnInit(): void {

    this.userSub = this.authService.user.subscribe(user => {
      this.isLogged = !!user;

    })

  }

  saveData() {
    this.storeService.storeRecipe();
  }

  fetchRecipes() {
    this.storeService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

  onLogout() {
    this.authService.logout();
  }

}
