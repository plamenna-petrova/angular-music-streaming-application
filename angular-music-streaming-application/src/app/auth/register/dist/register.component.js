"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var register_model_1 = require("src/app/core/models/register.model");
var tokenHelper_1 = require("src/utils/tokenHelper");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(fromBuilder, authService, router, httpClient) {
        this.fromBuilder = fromBuilder;
        this.authService = authService;
        this.router = router;
        this.httpClient = httpClient;
        this.registerForm = this.fromBuilder.group({
            email: ['', forms_1.Validators.required],
            username: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
    }
    RegisterComponent.prototype.submitRegistrationForm = function () {
        var _this = this;
        var registrationCredentials = new register_model_1.RegisterModel();
        registrationCredentials.email = this.registerForm.value.email;
        registrationCredentials.username = this.registerForm.value.username;
        registrationCredentials.password = this.registerForm.value.password;
        this.users.forEach(function (user) {
            if (user.email === registrationCredentials.email) {
                alert("The email is already taken");
                _this.invalidEmail = true;
            }
            if (user.username === registrationCredentials.username) {
                alert("The username is already taken");
                _this.invalidUsername = true;
            }
        });
        if (this.invalidEmail || this.invalidUsername) {
            return;
        }
        registrationCredentials.role = 'Normal User';
        registrationCredentials.token = tokenHelper_1.generateToken();
        this.authService.register(registrationCredentials).subscribe({
            next: function (data) {
                _this.response = data;
                console.log(_this.response);
                localStorage.setItem('token', JSON.stringify(registrationCredentials.token));
                _this.router.navigate(['/home']);
            },
            error: function (error) {
                console.log(error.message);
            }
        });
    };
    RegisterComponent.prototype.getAllUsers = function () {
        var _this = this;
        this.httpClient.get('http://localhost:3000/users').subscribe(function (data) {
            _this.users = data;
            _this.users.map(function (user) {
                delete user.token;
                return user;
            });
        });
    };
    RegisterComponent.prototype.ngOnInit = function () {
        this.getAllUsers();
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.scss']
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
