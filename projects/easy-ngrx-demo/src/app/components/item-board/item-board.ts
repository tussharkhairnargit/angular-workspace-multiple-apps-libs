import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {  MatInputModule } from '@angular/material/input';
import { AddItemForm } from '../add-item-form/add-item-form';
import { AddItemContract, AddItemFormEvent, ItemModel } from '../../core/model';

@Component({
  selector: 'app-item-board',
  imports: [FormsModule, MatCardModule, MatInputModule, MatButtonModule,  MatDividerModule, AddItemForm],
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
      this.listItems.push(event.value)
      this.getState();
      console.log("State :: onAddItem", this.listItems);
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

  removeItem(id: string) {
    const indexToRemove = this.listItems.findIndex(item => item.id == id);
    if (indexToRemove !== -1) {
      this.listItems.splice(indexToRemove, 1);
       this.getState();
    }
  }

  toggleSelected(item:ItemModel){
      item.selected = !item.selected ;
       this.getState();
  }

  toggleMakeStar(id: string) {
    const index = this.listItems.findIndex(item => item.id == id);
    if (index !== -1) {
      this.listItems[index].stared = !this.listItems[index].stared;
       this.getState();
    }
  }

  toggleState(item:ItemModel) {
      item.disabled = !item.disabled;
      this.getState();
  }

  viewState(){
    console.log(this.listItems)  
  }

  getState() {
    this.totalItems = this.listItems.length;
    this.totalSelected = this.listItems.filter(ele => ele.selected).length;
    this.totalDisabled = this.listItems.filter(ele => ele.selected).length
    this.totalActive = this.listItems.filter(ele => ele.selected).length;
    this.totalStared = this.listItems.reduce((total: number, ele) => { if (ele.stared) total++; return total }, 0);
  }
}

