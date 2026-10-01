export interface ItemModel {
    id: string;
    title: string;
    selected: boolean;
    starred: boolean;
    disabled: boolean;
}

export class ItemModel implements ItemModel {
    id: string = '';
    title: string = '';
    selected: boolean = false;
    starred: boolean = false;
    disabled: boolean = false;
}

export interface AddItemFormEvent {
    value: ItemModel;
}

export interface AddItemContract {
    onAddItem($event: AddItemFormEvent): void
}