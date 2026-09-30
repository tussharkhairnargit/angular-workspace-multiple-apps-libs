import { C, E } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import id from '@angular/common/locales/id';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-item-board',
  imports: [ FormsModule, MatCardModule, MatInputModule, MatButtonModule, MatButton, MatDividerModule],
  templateUrl: './item-board.html',
  styleUrl: './item-board.scss',
})
export class ItemBoard {
  totalItems = 0;
  totalSelected = 0;
  totalDisabled = 0
  totalActive = 0
totalStared = 0

  listItems: ItemModel[] = [];


  addItem(title: HTMLInputElement) {
    //console.log(title)
    const item = new ItemModel();
    item.id = Number(this.listItems.length + 1).toString();
    item.title = title.value;
    this.listItems.push(item)
     this.getState();
    //console.log("List Items" , this.listItems);
  }

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

export interface ItemModel {
  id: string;
  title: string;
  selected: boolean;
  stared: boolean;
  disabled: boolean;
}

export class ItemModel implements ItemModel {
  id: string = '';
  title: string = '';
  selected: boolean = false;
  stared: boolean = false;
  disabled: boolean = false;
}

