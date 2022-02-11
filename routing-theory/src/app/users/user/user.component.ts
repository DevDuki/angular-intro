import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user?: {id: number, name: string};
  paramsSubscription!: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const { id, name } = this.route.snapshot.params
    this.user = {
      id,
      name
    }

    // Subscribing to the params, so that if parameters are changed within the component, we will be able to get those new information
    this.paramsSubscription = this.route.params.subscribe(
      (updatedParams: Params) => this.user = { id: updatedParams['id'], name: updatedParams['name']  }
    );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
