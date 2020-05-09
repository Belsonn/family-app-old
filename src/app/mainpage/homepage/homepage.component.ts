import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  isAuthenticated = false;
  isLoading = false;
  private authStatus: Subscription;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.getIsAuthenticated();
    this.authStatus = this.authService
      .getAuthStatus()
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      });
    if (this.isAuthenticated && this.authService.getHasFamily()) {
      this.router.navigate(['home', 'family']);
    } else if (this.isAuthenticated) {
      this.router.navigate(['home', 'create']);
    }
  }
}
