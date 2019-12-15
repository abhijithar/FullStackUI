import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskListItemComponent } from './view-task-list-item.component';

describe('ViewTaskListItemComponent', () => {
  let component: ViewTaskListItemComponent;
  let fixture: ComponentFixture<ViewTaskListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTaskListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
