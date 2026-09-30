import { Component, EventEmitter, input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {  AddItemFormEvent, ItemModel } from '../../core/model';

@Component({
  selector: 'app-add-item-form',
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './add-item-form.html',
  styleUrl: './add-item-form.scss',
})
export class AddItemForm {

  @Output('addItem') onAddItem = new EventEmitter<AddItemFormEvent>()

  addItem(title: HTMLInputElement) {
    //console.log(title)
    if (title?.value?.trim().length) {
      const item = new ItemModel();
      item.title = title.value;
      this.onAddItem.emit({ value: item });
    }
  }

}