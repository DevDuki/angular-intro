import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from "../../shared/services/data-storage.service";
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isDropdownOpen: boolean = false;
  userSub!: Subscription;
  isAuthenticated: boolean = false;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user
      .subscribe((user: User | null) => {
        this.isAuthenticated = !!user
      })
  }

  onSaveData() {
    this.dataStorageService.saveRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
