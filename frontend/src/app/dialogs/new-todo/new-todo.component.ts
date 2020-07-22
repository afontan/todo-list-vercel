import {Component, Inject} from '@angular/core';
import {Todo} from "../../models/todo";
import {TodolistService} from "../../services/todolist.service";
import { MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  todoListId: number;
}

@Component({
  selector: 'todo-dialog',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss']
})

export class NewTodoDialog {

  todo: Todo = {
    title: "",
    isComplete: false,
    todoListId: this.data.todoListId
  }

  constructor(
    private todolistService: TodolistService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  save() {
    if(this.todo.title != "") {
      this.todolistService.postTodo(this.todo).subscribe(res => {}, error => {
        console.log("Error saving new todo list: "+error);
      });
    }
  }
}
