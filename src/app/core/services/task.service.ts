import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Models used in the service.
import { Task } from '../models/task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  private taskSvcBaseUrl = 'http://localhost:5100/tasks'

  // Add task to the collection
  addTask(taskData: Task): Observable<Task> {
    return this.http
      .post<Task>(this.taskSvcBaseUrl + '/', taskData, httpOptions);
  }

  // Add task to the collection
  getTask(): Observable<Task[]> {
    return this.http
      .get<Task[]>(this.taskSvcBaseUrl, httpOptions);
  }

  // Add task to the collection
  removeTask(id: String): Observable<Task> {
    return this.http
      .delete<Task>(this.taskSvcBaseUrl + '/' + id, httpOptions);
  }

  // Update task to the collection
  updateTask(taskData: Task): Observable<Task> {
    return this.http
      .put<Task>(this.taskSvcBaseUrl + '/', taskData, httpOptions);
  }  

}