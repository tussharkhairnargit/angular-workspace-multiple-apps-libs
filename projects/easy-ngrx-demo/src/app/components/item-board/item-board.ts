import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { AddItemForm } from '../add-item-form/add-item-form';
import { AddItemContract, AddItemFormEvent, ItemModel } from '../../core/model';
import { ItemCard } from '../item-card/item-card';
import { Store } from '@ngrx/store';
import { appState } from '@app-core/store';
import { listActions } from '@app-core/store/list.actions';
import { updateItem } from '@app-core/store/item.actions';
import { list, listStats } from '@app-core/store/list.selectors';

@Component({
  selector: 'app-item-board',
  imports: [AsyncPipe, FormsModule, MatCardModule, MatInputModule, MatButtonModule, MatDividerModule, AddItemForm, ItemCard],
  templateUrl: './item-board.html',
  styleUrl: './item-board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemBoard implements AddItemContract {

  readonly store = inject(Store<appState>);
  readonly listItems$ = this.store.select(list);
  readonly stats$ = this.store.select(listStats);

  onAddItem(event: AddItemFormEvent): void {
    this.store.dispatch(listActions.addItems({ payload: event.value }));
  }

  removeItem(id: string) {
    //this.store.dispatch({ type: '[LIST] remove item', payload:event.value});
    this.store.dispatch(listActions.removeItems({ id }));
  }

  toggleSelected(item: ItemModel) {
    this.store.dispatch(updateItem.selected({ id: item.id }));
  }

  toggleMakeStar(id: string) {
    this.store.dispatch(updateItem.starred({ id }));
  }

  toggleStatus(item: ItemModel) {
    this.store.dispatch(updateItem.disabled({ id: item.id }));
  }

  viewState() {
    this.store.select(list).subscribe(items => console.log(items)).unsubscribe();
  }
}

