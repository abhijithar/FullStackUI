import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Models used in the service.
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private userSvcBaseUrl = 'http://localhost:5100/users'

  // Add user to the collection
  addUser(userData: User): Observable<User> {
    return this.http
      .post<User>(this.userSvcBaseUrl + '/', userData, httpOptions);
  }

  // Add user to the collection
  getUser(): Observable<User[]> {
    return this.http
      .get<User[]>(this.userSvcBaseUrl, httpOptions);
  }

  // Add user to the collection
  removeUser(id: String): Observable<User> {
    return this.http
      .delete<User>(this.userSvcBaseUrl + '/' + id, httpOptions);
  }

}
