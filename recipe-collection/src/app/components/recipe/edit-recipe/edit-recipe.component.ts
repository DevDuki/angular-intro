import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit, OnDestroy {
  id?: number;
  editMode: boolean = false;
  routeSubscription!: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((updatedParams: Params) => {
      this.id = updatedParams['id'];
      this.editMode = updatedParams['id'] != null;
      console.log(this.id)
    })
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
