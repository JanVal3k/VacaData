import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface User {
  name?: string;
  email?: string;
  image?: string;
}

export interface Session {
  user: User;
  expires: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentSessionSubject = new BehaviorSubject<Session | null>(null);
  public currentSession$ = this.currentSessionSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkSession();
  }
  public get currentUser(): User | null {
    return this.currentSessionSubject.value?.user || null;
  }

  public get isAuthenticated(): boolean {
    return !!this.currentSessionSubject.value;
  }
// aqui quede en la explicacion 
  checkSession(): Observable<Session | null> {
    return this.http.get<Session | null>('/api/auth/session', { withCredentials: true })
      .pipe(
        tap(session => {
          this.currentSessionSubject.next(session);
        })
      );
  }

  signIn(provider: string = 'google'): void {
    window.location.href = `/api/auth/signin/${provider}`;
  }

  signOut(): Observable<any> {
    return this.http.post('/api/auth/signout', {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.currentSessionSubject.next(null);
        })
      );
  }
}