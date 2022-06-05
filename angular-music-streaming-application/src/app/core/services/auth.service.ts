import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginModel } from "../models/login.model";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { User } from "../models/user.model";
import { RegisterModel } from "../models/register.model";

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
    return this.httpClient.post<User>(`http://localhost:3000/users`, registerModel).pipe(tap((user: User) => {
      this.userSubject$.next(user);
      let registerUserToStore = { ...user };
      delete registerUserToStore.id;
      delete registerUserToStore.token;
      localStorage.setItem('user', JSON.stringify(registerUserToStore));
    }));
  }

  login(loginModel: LoginModel): Observable<User> {
    return this.httpClient.post<User>(`http://localhost:3000/login`, loginModel).pipe(tap((user: User) => {
      this.userSubject$.next(user);
      let loggedInUserToStore = { ...user };
      delete loggedInUserToStore.id;
      delete loggedInUserToStore.token;
      localStorage.setItem('user', JSON.stringify(loggedInUserToStore));
    }));
  }

  getAuthToken(): any {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userSubject$.next(null);
  }
}