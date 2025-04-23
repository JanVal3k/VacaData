import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bovine } from '../../models/Bovines.model';

@Injectable({
  providedIn: 'root'
})
export class BovinesService {
  private apiUrl = 'http://localhost:3000/bovines';
  constructor(private http: HttpClient) {}
  
  getBovines(user_id: string) {
    return this.http.get<Bovine[]>(`${this.apiUrl}?user_id=${user_id}`);
  }

  saveBovine(bovine: any): Observable<any> {
    return this.http.post(this.apiUrl, bovine);
  }
}
