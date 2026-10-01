import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemBoard } from './components/item-board/item-board';

@Component({
  selector: 'app-root',
  imports: [ ItemBoard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly title = signal('easy-ngrx-demo');
}
