import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {User} from "../models/user";
import {TodoList} from "../models/todolist";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private USER_URL = "http://localhost:8080/users";

  constructor(private httpClient: HttpClient) { }

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

  login(user: User){
    return this.httpClient.post(this.USER_URL+"/login", user).pipe(catchError(this.handleError));
  }

  signup(user: User){
    return this.httpClient.post(this.USER_URL+"/sign-up", user).pipe(catchError(this.handleError));
  }

  getUserTodoList(): Observable<TodoList[]> {
    let userId = localStorage.getItem('userId');
    // @ts-ignore
    return this.httpClient.get(this.USER_URL+"/"+userId+"/todo-lists").pipe(catchError(this.handleError));
  }
}
