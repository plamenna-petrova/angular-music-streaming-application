import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/core/models/login.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  response!: {};
  token?: string;
  users!: User[];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private httpClient: HttpClient) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  submitLoginForm(): void {
    let authenticationCredentials = new LoginModel();

    authenticationCredentials.username = this.loginForm.value.username;
    authenticationCredentials.password = this.loginForm.value.password;

    this.storeUserToken(authenticationCredentials.username);

    setTimeout(() => {
      this.authService.login(authenticationCredentials).subscribe({
        next: data => {
          this.response = data;
          let user = this.response as User;
          if (user.role === 'Administrator') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        error: error => {
          console.log(error.message);
        }
      });
    }, 100);
  }

  storeUserToken(username: string): void {
    this.httpClient.get<User[]>('http://localhost:3000/users').subscribe(data => {
      this.users = data;
      this.users.forEach(user => {
        if (user.username === username) {
          this.token = user.token;
          localStorage.setItem('token', JSON.stringify(this.token));
        }
      });
    });
  }

  ngOnInit(): void {
  }

}
