import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username: string = '';
  isEmpty: boolean = this.username === '';

  updateUserName(event: Event) {
    this.username = (<HTMLInputElement>event.target).value;
  }

  resetUserName() {
    this.username = '';
  }
}
