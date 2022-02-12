import { EventEmitter, Injectable } from '@angular/core';
import { Ingridient } from '../models/ingridient.model';
// @ts-ignore
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingridientsChanged: Subject<Ingridient[]> = new Subject<Ingridient[]>();
  startedEditing: Subject<number> = new Subject<number>();

  private ingridients: Ingridient[] = [
    new Ingridient('Apples', 5),
    new Ingridient('Tomatoes', 10),
  ];

  constructor() { }

  getIngridients(): Ingridient[] {
    return this.ingridients.slice();
  }

  getIngridient(index: number): Ingridient {
    return this.ingridients[index];
  }

  addIngridient(ingridient: Ingridient): void {
    this.ingridients.push(ingridient);
    this.ingridientsChanged.next(this.ingridients.slice());
  }

  addIngridients(ingridients: Ingridient[]): void {
    this.ingridients.push(...ingridients);
    this.ingridientsChanged.next(this.ingridients.slice());
  }

  updateIngridient(index: number, newIngridient: Ingridient): void {
    this.ingridients[index] = newIngridient;
    this.ingridientsChanged.next(this.ingridients.slice());
  }

  deleteIngridient(index: number) {
    this.ingridients = this.ingridients.filter((_, i: number) => i !== index)
    this.ingridientsChanged.next(this.ingridients.slice());
  }
}
