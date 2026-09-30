import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { AddItemForm } from '../add-item-form/add-item-form';
import { AddItemContract, AddItemFormEvent, ItemModel } from '../../core/model';
import { ItemCard } from '../item-card/item-card';

@Component({
  selector: 'app-item-board',
  imports: [FormsModule, MatCardModule, MatInputModule, MatButtonModule, MatDividerModule, AddItemForm, ItemCard],
  templateUrl: './item-board.html',
  styleUrl: './item-board.scss',
})
export class ItemBoard implements AddItemContract {

  totalItems = 0;
  totalSelected = 0;
  totalDisabled = 0
  totalActive = 0
  totalStared = 0

  listItems: ItemModel[] = [];

  onAddItem(event: AddItemFormEvent): void {
    let model = event.value;
    model.id = Number(this.listItems.length + 1).toString();
    this.listItems.push(model);

    this.getState();
    console.log("State :: onAddItem", this.listItems);
  }

  removeItem(id: string) {
    const indexToRemove = this.listItems.findIndex(item => item.id === id);
    if (indexToRemove !== -1) {
      this.listItems.splice(indexToRemove, 1);
      this.getState();
    }
  }

  // addItem(title: HTMLInputElement) {
  //   //console.log(title)
  //   const item = new ItemModel();
  //   item.id = Number(this.listItems.length + 1).toString();
  //   item.title = title.value;
  //   this.listItems.push(item)
  //    this.getState();
  //   //console.log("List Items" , this.listItems);
  // }



  toggleSelected(item: ItemModel) {
    console.log("toggleSelected", item)
    item.selected = !item.selected;
    this.getState();
  }

  toggleMakeStar(id: string) {
    const item = this.listItems.find(item => item.id === id);
    if (item) {
      item.stared = !item.stared
      this.getState();
    }

    // const index = this.listItems.findIndex(item => item.id == i.id);
    // if (index !== -1) {
    //   this.listItems[index].stared = !this.listItems[index].stared;
    this.getState();
    // }
  }

  toggleStatus(item: ItemModel) {
    item.disabled = !item.disabled;
    this.getState();
  }

  viewState() {
    console.log(this.listItems)
  }

  getState() {
    this.totalItems = this.listItems.length;
    this.totalStared = this.listItems.reduce((total: number, ele) => { if (ele.stared) total++; return total }, 0);
    this.totalSelected = this.listItems.filter(ele => ele.selected).length;
    this.totalDisabled = this.listItems.filter(ele => ele.disabled).length
    this.totalActive = this.listItems.filter(ele => !ele.disabled).length;
  }
}

