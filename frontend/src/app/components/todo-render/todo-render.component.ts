import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../../models/todo';
import {TodolistService} from "../../services/todolist.service";

@Component({
  selector: 'todo-render',
  templateUrl: './todo-render.component.html',
  styleUrls: ['./todo-render.component.scss']
})
export class TodoRenderComponent implements OnInit {
  @Input() todo: Todo;

  constructor(
    private todolistService: TodolistService
  ) { }

  ngOnInit(): void {
  }

  check() {
    this.todo.isComplete = !this.todo.isComplete;
    this.todolistService.updateTodo(this.todo).subscribe(res => {
      console.log(res);
    });
  }
}
