import { createActionGroup, props } from '@ngrx/store';
import { ItemModel } from '@app-core/model';

export const listActions = createActionGroup({
  source: 'LIST',
  events: {
    'add items': props<{ payload: ItemModel }>(),
    'remove items': props<{ id: string }>()
  }
});