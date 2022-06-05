"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var AuthService = /** @class */ (function () {
    function AuthService(httpClient) {
        this.httpClient = httpClient;
        this.userSubject$ = new rxjs_1.BehaviorSubject(null);
        this.user$ = this.userSubject$.asObservable();
        var user = localStorage.getItem('user');
        if (user) {
            this.userSubject$.next(JSON.parse(user));
        }
    }
    AuthService.prototype.register = function (registerModel) {
        var _this = this;
        return this.httpClient.post("http://localhost:3000/users", registerModel).pipe(rxjs_1.tap(function (user) {
            _this.userSubject$.next(user);
            localStorage.setItem('user', JSON.stringify(user));
        }));
    };
    AuthService.prototype.login = function (loginModel) {
        var _this = this;
        return this.httpClient.post("http://localhost:3000/login", loginModel).pipe(rxjs_1.tap(function (user) {
            _this.userSubject$.next(user);
            localStorage.setItem('user', JSON.stringify(user));
        }));
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.userSubject$.next(null);
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
