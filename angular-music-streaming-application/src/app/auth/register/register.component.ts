import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterModel } from 'src/app/core/models/register.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { comparePasswords } from 'src/app/core/validators/password-match';

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
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      username: ['', Validators.required],
      matchingPasswords: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(2)]],
        passwordConfirm: ['', [Validators.required, Validators.minLength(2)]]
      }, { validators: comparePasswords })
    });
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

    console.log(this.registerForm.value);

    registrationCredentials.email = this.registerForm.value.email;
    registrationCredentials.username = this.registerForm.value.username;
    registrationCredentials.password = this.registerForm.value.matchingPasswords.password;

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

    this.authService.register(registrationCredentials).subscribe({
      next: data => {
        this.response = data;
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