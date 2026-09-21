import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {Subject } from 'rxjs/internal/Subject';
import { of } from 'rxjs/internal/observable/of';
import { delay, mergeMap, concatMap, exhaustMap , switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-events-streams',
  imports: [CommonModule],
  templateUrl: './events-streams.html',
  styleUrl: './events-streams.scss',
})
export class EventsStreams implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  subject: Subject<number> = new Subject<number>();
  eventList = signal<string[]>([]);

  ngOnInit() {
    this.eventList.set([]);

    this.subject
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        /**
         * All four operators (mergeMap, switchMap, concatMap, and exhaustMap) serve the exact same primary goal: they transform an inner observable into raw data values. They differ purely in how they manage overlapping inner streams.
         */
           //switchMap(value => {
          mergeMap(value => {
          // concatMap(value => {
          // exhaustMap(value => {
            console.log(`Processing value: ${value}`);

            //this.eventList.push(`Processing value: ${value}`);
            this.eventList.update(events => [...events, `Processing value: ${value}`]);
            return of(value).pipe(delay(2000));  //Because the inner function returns a new Observable using 'of' every time, your outer this.subject becomes a Higher-Order Observable—essentially an Observable that emits Observables.
          })
      )
      .subscribe({
        next: (value) => {
          console.log(`Received value: ${value}`);
            // The template is iterating eventList correctly, and the subscription does execute. 
            // The missing UI update is caused by mutating a plain array inside the delayed RxJS callback: Angular’s zoneless change detection does not get a reactive state notification from push(). Convert eventList to a signal and update the template to read it, so the delayed emission schedules rendering.
            // this.eventList.push(`Processing value: ${value}`);
          this.eventList.update(events => [...events, `Received value: ${value}`]);
        }
      });
  }



}