import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemModel } from '../../core/model';

@Component({
  selector: 'app-item-card',
  imports: [],
  templateUrl: './item-card.html',
  styleUrl: './item-card.scss',
})
export class ItemCard {
  @Input('data') item!: ItemModel;

  @Output('select') select = new EventEmitter();
  @Output('markStar') markStar = new EventEmitter();
  @Output('remove') remove = new EventEmitter();
  @Output('disable') disable = new EventEmitter();

  toggleSelected(item: ItemModel) {
  //  item.selected = !item.selected;
    this.select.emit(item);
  }

  toggleMakeStar(item: ItemModel) {
   // item.stared = !item.stared;
    this.markStar.emit(item);
  }

  toggleStatus(item: ItemModel) {
    //item.disabled = !item.disabled;
    this.disable.emit(item);

  }

  removeItem(item: ItemModel) {
    this.remove.emit(item)
  }

  editItem(item: ItemModel) { }

}
