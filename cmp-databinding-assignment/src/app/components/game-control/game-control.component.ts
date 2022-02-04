import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.scss']
})
export class GameControlComponent implements OnInit {
  intervalId!: number;
  counter: number = 0;
  @Output() gameStarted = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  startGame(): void {
    this.intervalId = setInterval(() => {
      ++this.counter;
      this.gameStarted.emit(this.counter);
    }, 1000);
  }

  pauseGame():void {
    clearInterval(this.intervalId);
  }
}
