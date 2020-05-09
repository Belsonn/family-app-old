import { Injectable } from '@angular/core';
import { Family, FamilyResponse } from '../models/family.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FamilyService {
  family: Family;
  private tokenErrorSub = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  getMyFamily() {
    return this.http.get<FamilyResponse>(
      'http://localhost:3000/api/v1/family/myFamily'
    );
  }

  getTokenError() {
    return this.tokenErrorSub.asObservable();
  }

  createFamily(name: string) {
    return this.http
      .post<FamilyResponse>('http://localhost:3000/api/v1/family/create', {
        name: name,
      })
      .subscribe(
        (res) => {
          this.family = res.data.family;
          this.authService.setHasFamily(true);
          this.router.navigate(['/']);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  joinFamily(inviteToken: string) {
    this.http
      .post<FamilyResponse>('http://localhost:3000/api/v1/family/joinFamily', {
        token: inviteToken,
      })
      .subscribe(
        (res) => {
          this.family = res.data.family;
          this.authService.setHasFamily(true);
          this.router.navigate(['/']);
        },
        (err) => {
          console.log(err);
          this.tokenErrorSub.next(true);
        }
      );
  }
}
