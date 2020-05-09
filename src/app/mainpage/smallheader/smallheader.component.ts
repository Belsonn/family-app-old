import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-smallheader',
  templateUrl: './smallheader.component.html',
  styleUrls: ['./smallheader.component.css'],
})
export class SmallheaderComponent implements OnInit {
  userIsAuthenticated = false;
  userName: string = '';
  private authListener: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.userName = this.authService.getUserName();
    this.authListener = this.authService
      .getAuthStatus()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  onLog() {
    console.log(this.authService.getUserName());
  }


  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListener.unsubscribe();
  }
}
