import { EventEmitter, Injectable } from '@angular/core';
import { Ingridient } from '../models/ingridient.model';
// @ts-ignore
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingridientsChanged: Subject<Ingridient[]> = new Subject<Ingridient[]>();

  private ingridients: Ingridient[] = [
    new Ingridient('Apples', 5),
    new Ingridient('Tomatoes', 10),
  ];

  constructor() { }

  getIngridients(): Ingridient[] {
    return this.ingridients.slice();
  }

  addIngridient(ingridient: Ingridient): void {
    this.ingridients.push(ingridient);
    this.ingridientsChanged.next(this.ingridients.slice())
  }

  addIngridients(ingridients: Ingridient[]): void {
    this.ingridients.push(...ingridients);
    this.ingridientsChanged.next(this.ingridients.slice())
  }
}
