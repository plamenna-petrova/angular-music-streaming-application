import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterModel } from 'src/app/core/models/register.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

import { generateToken } from 'src/utils/tokenHelper';
import { User } from 'src/app/core/models/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  response!: {};

  users!: User[];

  constructor(private fromBuilder: FormBuilder, private authService: AuthService, private router: Router, private httpClient: HttpClient) {
    this.registerForm = this.fromBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitRegistrationForm(): void {
    let registrationCredentials = new RegisterModel();

    registrationCredentials.email = this.registerForm.value.email;
    registrationCredentials.username = this.registerForm.value.username;
    registrationCredentials.password = this.registerForm.value.password;

    let invalidEmail = false;
    let invalidUsername = false;

    this.users.forEach(user => {
      if (user.email === registrationCredentials.email) {
        alert("The email is already taken");
        invalidEmail = true;
      }
      if (user.username === registrationCredentials.username) {
        alert("The username is already taken");
        invalidUsername = true;
      }
    });

    if (invalidEmail || invalidUsername) {
      return;
    }

    registrationCredentials.role = 'Normal User';
    registrationCredentials.token = generateToken();

    this.authService.register(registrationCredentials).subscribe({
      next: data => {
        this.response = data;
        console.log("in registration");
        console.log(this.response);
        localStorage.setItem('token', JSON.stringify(registrationCredentials.token));
        this.router.navigate(['/home']);
      },
      error: error => {
        console.log(error.message);
      }
    });
  }

  getAllUsers(): void {
    this.httpClient.get<User[]>('http://localhost:3000/users').subscribe(data => {
      this.users = data;
      this.users.map(user => {
        delete user.token;
        return user;
      });
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

}
