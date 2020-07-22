import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {User} from "../models/user";
import {catchError} from "rxjs/operators";
import {Todo} from "../models/todo";
import {TodoList} from "../models/todolist";

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  private TODOLIST_URL = "http://localhost:8080/todo-lists";
  private TODO_URL = "http://localhost:8080/todos";

  constructor(
    private httpClient: HttpClient
  ) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getTodosOfTodoList(id: number): Observable<Todo[]> {
    // @ts-ignore
    return this.httpClient.get(this.TODOLIST_URL+"/"+id+"/todos").pipe(catchError(this.handleError));
  }

  updateTodo(todo: Todo){
    return this.httpClient.put(this.TODO_URL+"/"+todo.id, todo).pipe(catchError(this.handleError));
  }

  postTodoList(todoList: TodoList) {
    return this.httpClient.post(this.TODOLIST_URL, todoList).pipe(catchError(this.handleError));
  }

  postTodo(todo: Todo) {
    return this.httpClient.post(this.TODO_URL, todo).pipe(catchError(this.handleError));
  }
}
