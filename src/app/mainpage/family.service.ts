import { Injectable } from '@angular/core';
import { Family, FamilyResponse } from '../models/family.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { FamilyEvent, FamilyEventResponse } from '../models/event.model';

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
          this.authService.familyId = res.data.family._id;
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
          this.authService.familyId = res.data.family._id;
          this.authService.setHasFamily(true);
          this.router.navigate(['/']);
        },
        (err) => {
          console.log(err);
          this.tokenErrorSub.next(true);
        }
      );
  }

  createEvent(event: FamilyEvent) {
    return this.http.post<FamilyEventResponse>(
      'http://localhost:3000/api/v1/event/create',
      event
    );
  }
  getEvents(familyId: string) {
    return this.http.post<any>('http://localhost:3000/api/v1/event/', {
      family: familyId,
    });
  }

  deleteEvent(eventId: string) {
    return this.http.delete(`http://localhost:3000/api/v1/event/${eventId}`);
  }
  updateList(list: string, listContent: string[]) {
    return this.http.post<FamilyResponse>(
      `http://localhost:3000/api/v1/family/list/update`,
      {
        listName: list,
        listContent: listContent,
      }
    );
  }
}
