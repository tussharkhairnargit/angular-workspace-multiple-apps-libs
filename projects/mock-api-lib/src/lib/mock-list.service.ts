import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/internal/operators/delay';

@Injectable({
  providedIn: 'root',
})
export class MockListService  {

  readonly delay = 1000;


  getListOfMonths(): Observable<string[]> {
    return of(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']).pipe(delay(this.delay));
  }

  getListOfDays(): Observable<string[]> {
    return of(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']).pipe(delay(this.delay));
  }


}
