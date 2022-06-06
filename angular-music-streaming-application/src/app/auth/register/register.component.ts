import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterModel } from 'src/app/core/models/register.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

import { generateToken } from 'src/utils/tokenHelper';
import { User } from 'src/app/core/models/user.model';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  response!: {};
  users!: User[];

  constructor(
    private fromBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private httpClient: HttpClient,
    private toastr: ToastrService) {
    this.registerForm = this.fromBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
      ])]
    });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
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
        this.toastr.error('Cannot proceed further with registration', 'Email already taken', {
          timeOut: 2000,
          positionClass: 'toast-bottom-right'
        });
        invalidEmail = true;
      }
      if (user.username === registrationCredentials.username) {
        this.toastr.error('Cannot proceed further with registration', 'Username already taken', {
          timeOut: 4000,
          positionClass: 'toast-bottom-right'
        });
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

  ngOnChanges(): void {
    console.log(this.registerForm);
  }

}