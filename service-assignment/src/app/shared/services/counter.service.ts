import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  toActiveCounter: number = 0;
  toInactiveCounter: number = 0;

  constructor() { }

  addToActiveAction(): void {
    this.toActiveCounter++
    console.log('Total actions to active: ', this.toActiveCounter)
  }

  addToInactiveAction(): void {
    this.toInactiveCounter++
    console.log('Total actions to inactive: ', this.toInactiveCounter)
  }
}
