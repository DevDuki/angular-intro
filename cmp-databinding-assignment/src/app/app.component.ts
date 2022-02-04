import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  onGameStarted(count: number): void {
    if (count % 2 === 0) {
      this.evenNumbers.push(count)
    } else {
      this.oddNumbers.push(count)
    }
  }
}
