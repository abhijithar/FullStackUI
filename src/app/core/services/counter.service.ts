import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Counter } from '../models/counter';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  constructor(private http: HttpClient) { }
  private counterSvcBaseUrl = 'http://localhost:5100/counters'

  // Update next Id to the collection
  getNextId(counterData: Counter): Observable<Counter> {
    return this.http
      .put<Counter>(this.counterSvcBaseUrl + '/', counterData, httpOptions);
  }  


}
