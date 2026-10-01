import { createReducer, on } from "@ngrx/store";

import { listActions } from "@app-core/store/list.actions";
import { ItemModel } from "@app-core/model";
import { updateItem } from "./item.actions";

export type ListState = {
  list: ItemModel[];
};

export const initialListState: ListState = {
  list: [],
};

export const ListReducer = createReducer(
    initialListState,
    on(listActions.addItems, (state, { payload }) => {
        const nextId = Math.max(0, ...state.list.map(item => Number(item.id) || 0)) + 1;
        return { ...state, list: [...state.list, { ...payload, id: nextId.toString() }] };
    }),
    on(listActions.removeItems, (state, { id }) => ({ ...state, list: state.list.filter(item => item.id !== id) })),
    on(updateItem.starred, (state, { id }) => { 
        return { ...state, list: state.list.map(item => item.id === id ? { ...item, starred: !item.starred } : item) };
    }),
    on(updateItem.selected, (state, { id }) => {
        return { ...state, list: state.list.map(item => item.id === id ? { ...item, selected: !item.selected } : item) };
    }),
    on(updateItem.disabled, (state, { id }) => {
        return { ...state, list: state.list.map(item => item.id === id ? { ...item, disabled: !item.disabled } : item) };
    })
);
