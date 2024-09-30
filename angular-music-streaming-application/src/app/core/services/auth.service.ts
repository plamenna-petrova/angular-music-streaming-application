import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginModel } from "../models/login.model";
import { BehaviorSubject, catchError, Observable, tap, throwError } from "rxjs";
import { User } from "../models/user.model";
import { RegisterModel } from "../models/register.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject$ = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject$.asObservable();

  constructor(private httpClient: HttpClient) {
    const user = localStorage.getItem('user');

    if (user) {
      this.userSubject$.next(JSON.parse(user));
    }
  }

  register(registerModel: RegisterModel): Observable<User> {
    const apiUrl = environment.apiUrl;
  
    return this.httpClient.post<User>(`${apiUrl}/api/auth/register`, registerModel).pipe(
      tap((user: User) => {
        if (user && user.token) {
          localStorage.setItem('token', user.token);
          let registeredUserToStore = { ...user };
          delete registeredUserToStore.token; 
          localStorage.setItem('user', JSON.stringify(registeredUserToStore));
        } else {
          console.error('Token is undefined');
        }
      }),
      catchError(err => {
        console.error('Registration failed', err);
        return throwError(err);
      })
    );
  }
  
  login(loginModel: LoginModel): Observable<User> {
    const apiUrl = environment.apiUrl;

    return this.httpClient.post<User>(`${apiUrl}/api/auth/login`, loginModel).pipe(
        tap((user: User) => {
            this.userSubject$.next(user);

            if (user.token) {
              localStorage.setItem('token', user.token);
            }

            let loggedInUserToStore = { ...user };

            delete user.token;
            localStorage.setItem('user', JSON.stringify(loggedInUserToStore));
        }),
        catchError(err => {
            console.error('Login failed', err);
            return throwError(err);
        })
    );
}

  getAuthToken(): any {
    return localStorage.getItem('token');
  }

  storeUserToken(username: string, users: User[], token?: string): void {
    this.getAllUsers().subscribe(data => {
      users = data;

      users.forEach(user => {
        if (user.username === username) {
          token = user.token;
          localStorage.setItem('token', JSON.stringify(token));
        }
      });
    });
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:3000/users');
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userSubject$.next(null);
  }
}