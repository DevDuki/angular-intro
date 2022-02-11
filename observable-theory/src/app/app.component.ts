import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';
// @ts-ignore
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  userAcitvated: boolean = false;
  private activatedObservableSubscription!: Subscription;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.activatedObservableSubscription = this.userService.activatedObservable.subscribe((didClick: boolean) => {
      this.userAcitvated = didClick;
    })
  }

  ngOnDestroy() {
    this.activatedObservableSubscription.unsubscribe();
  }
}
