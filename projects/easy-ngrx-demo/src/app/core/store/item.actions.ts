import { createActionGroup, props } from "@ngrx/store";

export const updateItem = createActionGroup({
    source: '[item]',
    events: {
        starred: props<{ id: string }>(),
        selected: props<{ id: string }>(),
        disabled: props<{ id: string }>()
    }
});