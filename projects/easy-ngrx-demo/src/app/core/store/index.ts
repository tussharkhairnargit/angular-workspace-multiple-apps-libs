import { ActionReducerMap } from '@ngrx/store';
import { ListReducer, ListState } from './list.reducers';

export type appState = {
  listReducer: ListState
};

export const appReducer: ActionReducerMap<appState> = {
  listReducer: ListReducer
};
