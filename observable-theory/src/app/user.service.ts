import { EventEmitter, Injectable } from '@angular/core';
// @ts-ignore
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  activatedObservable: Subject<boolean> = new Subject<boolean>();

  constructor() { }
}
