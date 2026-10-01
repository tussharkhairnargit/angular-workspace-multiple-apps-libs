import { createSelector } from '@ngrx/store';
import { appState } from '@app-core/store';

export const list = (state: appState) => state.listReducer.list;

export const listStats = createSelector(list, (l) => ({
  totalItems: l.length,
  totalStarred: l.filter(item => item.starred).length,
  totalSelected: l.filter(item => item.selected).length,
  totalDisabled: l.filter(item => item.disabled).length,
  totalActive: l.filter(item => !item.disabled).length
}));