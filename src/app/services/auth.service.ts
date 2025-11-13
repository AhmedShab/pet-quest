import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface User {
  _id: string;
  email: string;
  name?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http: HttpClient;
  private readonly tokenStorageKey = 'petQuestToken';
  private readonly _user = signal<User | null>(null);

  constructor(http: HttpClient) {
    this.http = http;
  }

  readonly user = computed(() => this._user());
  readonly isAuthenticated = computed(() => this._user() !== null);

  initializeFromStorage(): Observable<User | null> {
    const token = localStorage.getItem(this.tokenStorageKey);

    if (!token) {
      return of(null);
    }
    return this.http.get<User>('/api/auth/me').pipe(
      tap((u) => this._user.set(u)),
      catchError(() => {
        this.logout();
        return of(null);
      })
    );
  }

  login(credentials: LoginDto): Observable<User> {
    return this.http
      .post<{ token: string; user: User }>('/api/auth/login', credentials)
      .pipe(
        tap(({ token, user }) => {
          localStorage.setItem(this.tokenStorageKey, token);
          this._user.set(user);
        }),
        map((res) => res.user)
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenStorageKey);
    this._user.set(null);
  }

  get token(): string | null {
    return localStorage.getItem(this.tokenStorageKey);
  }
}

