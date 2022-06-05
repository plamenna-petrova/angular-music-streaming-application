import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Authenticate } from "../models/authenticate.model";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private userSubject$ = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject$.asObservable();

  constructor(private httpClient: HttpClient) {

  }

  login(authenticate: Authenticate): Observable<User> {
    return this.httpClient.post<User>(`http://localhost:3000/login`, authenticate).pipe(tap((user: User) => this.userSubject$.next(user)));
  }
}