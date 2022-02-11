import { Component, OnDestroy, OnInit } from '@angular/core';
// @ts-ignore
import { interval, Subscription, Observable, Observer, filter } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  intervalSubscription!: Subscription;

  constructor() { }

  ngOnInit() {
    // this.intervalSubscription = interval(1000).subscribe((count: number) => {
    //   console.log(count)
    // })

    //---- Observable
    const customInterval = new Observable((observer: Observer<number>) => {
      let count: number = 0;
      setInterval(() => {
        // next
        observer.next(++count);

        // complete
        if (count === 2) {
          observer.complete();
        }

        // error
        if (count > 3) {
          observer.error(new Error('count greater than 3!'))
        }
      }, 1000)
    });

    //---- Operators
    //---- Subscription
    this.intervalSubscription = customInterval
      .pipe(
        filter((data: number) => {
          return data > 1;
        }),
        map((data: number): string => {
          return 'Round: ' + data;
        })
      )
      .subscribe({
        next:     (count: string) => console.log(count),
        error:    (error: Error)  => console.log(error.message),
        complete: ()              => console.log('interval completed')
      })
  }

  ngOnDestroy() {
    this.intervalSubscription.unsubscribe();
  }
}
