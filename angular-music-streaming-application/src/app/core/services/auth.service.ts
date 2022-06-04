import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Authenticate } from "../models/authenticate.model";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private httpClient: HttpClient) {

    }

    login(authenticate: Authenticate): Observable<any> {
      return this.httpClient.post<User>(`http://localhost:3000/login`, authenticate);
    }
}