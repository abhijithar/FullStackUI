import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Models used in the service.
import { Project } from '../models/project';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }
  private projectSvcBaseUrl = 'http://localhost:5100/projects'

  // Add user to the collection
  addProject(projectData: Project): Observable<Project> {
    return this.http
      .post<Project>(this.projectSvcBaseUrl + '/', projectData, httpOptions);
  }

  // Add user to the collection
  getProject(): Observable<Project[]> {
    return this.http
      .get<Project[]>(this.projectSvcBaseUrl, httpOptions);
  }

}
