import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, input, Output, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddItemFormEvent, ItemModel } from '@app-core/model';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-item-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './add-item-form.html',
  styleUrl: './add-item-form.scss',
})
export class AddItemForm {

  @Output('addItem') onAddItem = new EventEmitter<AddItemFormEvent>()
  //@ViewChild('titleField') titleField! : ElementRef ;

  addItem(title: HTMLInputElement) {
    //console.log(title)
    if (title?.value?.trim().length) {
      const item = new ItemModel();
      item.title = title.value;
      this.onAddItem.emit({ value: item });
      // this.titleField.nativeElement.value = "";
    }
    title.value = '';
  }

}