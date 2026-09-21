import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsStreams } from './events-streams';

describe('EventsStreams', () => {
  let component: EventsStreams;
  let fixture: ComponentFixture<EventsStreams>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsStreams],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsStreams);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
