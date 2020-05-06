import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer;
  private authStatus = new Subject<boolean>();
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  getToken() {
      return this.token;
  }

  signup(
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) {
    const newUser = {
      name: name,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
    };
    this.http
      .post('http://localhost:3000/api/v1/users/signup', newUser)
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['/']);
      });
  }

  login(email: string, password: string) {
    const User = { email: email, password: password };
    this.http
      .post<{ status: string; token: string; expiresIn: Date; data: any }>(
        'http://localhost:3000/api/v1/users/login',
        User
      )
      .subscribe(
        (res) => {
          this.token = res.token;
          console.log(this.token)
          this.router.navigate(['/']);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  getMe() {
    this.http.get('http://localhost:3000/api/v1/users/me').subscribe(
      (res) => {
        console.log(res);
      },
      (error) => console.log(error)
    );
  }
}
