import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBoard } from './item-board';

describe('ItemBoard', () => {
  let component: ItemBoard;
  let fixture: ComponentFixture<ItemBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemBoard],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemBoard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
