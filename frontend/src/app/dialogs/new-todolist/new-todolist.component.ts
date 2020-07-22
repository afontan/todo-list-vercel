import { Component } from '@angular/core';
import {TodolistService} from "../../services/todolist.service";
import {TodoList} from "../../models/todolist";

@Component({
  selector: 'todolist-dialog',
  templateUrl: './new-todolist.component.html',
  styleUrls: ['./new-todolist.component.scss']
})
export class NewTodoListDialog {
  todoList: TodoList = {
    title: "",
    color: "",
    userId: localStorage.getItem('userId')
  }

  constructor(
    private todolistService: TodolistService
  ) { }

  save() {
    if(this.todoList.title != "") {
      this.todolistService.postTodoList(this.todoList).subscribe(res => {

      }, error => {
        console.log("Error saving new todo list");
      });
    }
  }
}
