import { CommonModule } from '@angular/common';
import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { MockListService } from 'mock-api-lib';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  providers: [MockListService],
  template:`
    <div class="viewport-center">
      <div class="counter-board">
        <h1>List Rendering</h1>
        <input type="text" placeholder="Enter some text" #newItem /> <button (click)="updateList(newItem.value)">Submit</button>
              <hr>
      <div class="display:block">
      <!-- <ol *ngFor="let item of items | slice:0:items.length; trackBy: trackByFn;">
        <li>{{ item }}</li>
      </ol> -->
      <ol>
          @for (item of items; track trackByFn(item )) {
            <li>{{ item }}</li> 
          }
      </ol>
      {{ items  }}
      </div>
      </div>

    </div>
  
  `,
  styles: [`
      :host {
      display: block;
      min-height: 100vh;
    }
    h1{
      font-size: 3rem;
    }

    .viewport-center {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .counter-board {
      border-radius: 10px;
      border: 1px solid #000;
      padding: 20px;
      width: 500px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      background: #fff;
    }

    .actions {
      display: flex;
      gap: 10px;
    
    }
    input { 
        padding: 10px 20px;
          border-radius: 10px;
          border: 2px solid #000;
    }
        button {
      margin: 5px;
      padding: 10px 20px;
      border-radius: 10px;
      border: 2px solid #000;
      cursor: pointer;
    }
    `],
  animations: []
})
export class App {
  items = ['Item 1', 'Item 2', 'Item 3'];
  mockListService = inject(MockListService);

  updateList(newItem: string) {
    if (newItem.trim() !== '') {
     // this.items = [...this.items, newItem];
      this.items.push(newItem);
    }
  }

  trackByFn( item: string): number {
    return this.items.indexOf(item);
  }


  ngOnInit() {
    this.mockListService.getListOfMonths().subscribe(months => {
      console.log('Months:', months);
    });

    this.mockListService.getListOfDays().subscribe(days => {
      console.log('Days:', days);
    });
}
}
