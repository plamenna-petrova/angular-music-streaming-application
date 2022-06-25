import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginModel } from "../models/login.model";
import { BehaviorSubject, Observable, tap } from "rxjs";
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
    return this.httpClient.post<User>(`${apiUrl}/users`, registerModel).pipe(tap((user: User) => {
      this.userSubject$.next(user);
      let registeredUserToStore = { ...user };
      delete registeredUserToStore.id;
      delete registeredUserToStore.token;
      localStorage.setItem('user', JSON.stringify(registeredUserToStore));
    }));
  }

  login(loginModel: LoginModel): Observable<User> {
    const apiUrl = environment.apiUrl;
    return this.httpClient.post<User>(`${apiUrl}/login`, loginModel).pipe(tap((user: User) => {
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

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userSubject$.next(null);
  }

}