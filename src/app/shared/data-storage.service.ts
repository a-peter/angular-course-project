import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private serverRoot = 'https://ng-course-recipe-book-82868.firebaseio.com/'

  constructor(private http: HttpClient) { }
}
