import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  odds: number[] = [1, 3, 5];
  evens: number[] = [2, 4];
  onlyOdd: boolean = false;
  value: number = 5;
}
