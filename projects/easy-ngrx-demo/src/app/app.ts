import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemBoard } from './components/item-board/item-board';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ItemBoard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('easy-ngrx-demo');
}
