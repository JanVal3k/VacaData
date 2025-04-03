import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bovine } from '../../models/Bovines.model';

@Injectable({
  providedIn: 'root'
})
export class BovinesService {
  private apiUrl = 'http://localhost:4321/api/Bovines';
  constructor(private http: HttpClient) {}

  getBovines(): Observable<{ success: boolean; data: Bovine[] }> { 
    return this.http.get<{ success: boolean; data: Bovine[] }>(this.apiUrl);
  }
}