import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  recipePageIsSelected: boolean = true;

  onSelectedNav(selection: string): void {
    this.recipePageIsSelected = selection === 'recipe';
  }
}
