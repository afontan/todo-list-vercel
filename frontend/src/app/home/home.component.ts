import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { TodoList } from "../models/todolist";
import {Todo} from "../models/todo";
import {TodolistService} from "../services/todolist.service";
import {MatDialog} from "@angular/material/dialog";
import {NewTodoListDialog} from "../dialogs/new-todolist/new-todolist.component";
import {NewTodoDialog} from "../dialogs/new-todo/new-todo.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  todoLists: TodoList[];
  selectedTodoList: TodoList;
  todos: Todo[];

  constructor(
    private userService: UserService,
    private todolistService: TodolistService,
    public dialog: MatDialog
  ) {
    this.userService.getUserTodoList().subscribe(res => {
      this.todoLists = res;
    }, error => {
      console.log("Error while getting todo lists: "+error);
    });
  }

  ngOnInit() {
  }

  sideClick(todoList: TodoList) {
    this.selectedTodoList = todoList;
    this.todolistService.getTodosOfTodoList(todoList.id).subscribe(res => {
      this.todos = res;
    }, error => {
      console.log("Error while getting todos of todolist: "+error);
    });
  }

  newTodoListDialog() {
    let dialogRef = this.dialog.open(NewTodoListDialog);
    dialogRef.afterClosed().subscribe(result => {
      this.userService.getUserTodoList().subscribe(res => {
        this.todoLists = res;
      }, error => {
        console.log("Error while getting todo lists: "+error);
      });
    });
  }

  newTodoDialog() {
    let dialogRef = this.dialog.open(NewTodoDialog, {
      data: {todoListId: this.selectedTodoList.id}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("to fast");
      this.todolistService.getTodosOfTodoList(this.selectedTodoList.id).subscribe(res => {
        this.todos = res;
      }, error => {
        console.log("Error while getting todos of todolist: "+error);
      });
    });
  }
}
