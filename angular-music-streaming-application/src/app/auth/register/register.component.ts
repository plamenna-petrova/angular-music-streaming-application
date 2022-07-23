import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RegisterModel } from 'src/app/core/models/register.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

import { generateToken } from 'src/utils/tokenHelper';
import { User } from 'src/app/core/models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  matchingPasswordsGroup!: FormGroup;
  response!: {};
  users!: User[];

  constructor(
    private fromBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) {
    this.matchingPasswordsGroup = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(2)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(2)]),
    }, this.passwordMatchValidator);
    this.registerForm = new FormGroup({
      email: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      matchingPasswords: this.matchingPasswordsGroup
    });
  }

  passwordMatchValidator(matchingPasswordsGroup: AbstractControl) {
    return matchingPasswordsGroup.get('password')!.value === matchingPasswordsGroup.get('passwordConfirm')!.value
      ? null : { 'mismatch': true };
  }

  get email() {
    return this.registerForm.get('email')!;
  }

  get username() {
    return this.registerForm.get('username')!;
  }

  get matchingPasswords() {
    return this.registerForm.get('matchingPasswords')!;
  }

  get password(): AbstractControl {
    return this.matchingPasswords.get('password')!;
  }

  get passwordConfirm(): AbstractControl {
    return this.matchingPasswords.get('passwordConfirm')!;
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
        invalidEmail = true;
      }
      if (user.username === registrationCredentials.username) {
        invalidUsername = true;
      }
    });

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.toastr.error('Errors Found in some of the input fields', 'Cannot complete user registration', {
        timeOut: 2000,
        positionClass: 'toast-bottom-right'
      })
      return;
    }

    if (invalidEmail || invalidUsername) {
      this.toastr.error('Cannot proceed further with registration', 'Credentials already taken', {
        timeOut: 2000,
        positionClass: 'toast-bottom-right'
      });
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

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe(data => {
      this.users = data;
      this.users.map(user => {
        delete user.token;
        return user;
      });
    });
    this.passwordConfirm.valueChanges.subscribe(value => {
      if (value === '') {
        this.passwordConfirm.markAsPristine();
      }
    });
  }

}