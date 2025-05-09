import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiURL = 'http://localhost:3000/users/';
  constructor(private http: HttpClient) {}

  saveUser(user: any): Observable<any> {
    return this.http.post(this.apiURL, user);
  }
}
