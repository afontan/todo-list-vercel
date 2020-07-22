import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTodolistComponent } from './new-todolist.component';

describe('NewTodolistComponent', () => {
  let component: NewTodolistComponent;
  let fixture: ComponentFixture<NewTodolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTodolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTodolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
