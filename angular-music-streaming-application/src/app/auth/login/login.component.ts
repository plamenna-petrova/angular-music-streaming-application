import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Authenticate } from 'src/app/core/models/authenticate.model';
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

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  submitLoginForm(): void {
    let authenticationCredentials = new Authenticate();

    authenticationCredentials.username = this.loginForm.value.username;
    authenticationCredentials.password = this.loginForm.value.password;

    this.authService.login(authenticationCredentials).subscribe({
      next: data => {
        this.response = data;
        let user = this.response as User;
        localStorage.setItem('token', JSON.stringify(user.token));
        this.router.navigate(['/home']);
      },
      error: error => {
        console.log(error.message);
      }
    });
  }

  ngOnInit(): void {
  }

}
