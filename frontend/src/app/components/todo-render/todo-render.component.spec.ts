import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoRenderComponent } from './todo-render.component';

describe('TodoRenderComponent', () => {
  let component: TodoRenderComponent;
  let fixture: ComponentFixture<TodoRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
