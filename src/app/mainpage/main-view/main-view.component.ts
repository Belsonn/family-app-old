import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  isLoading = false;
  hasFamily = false;
  isAuthenticated = false;
  private authStatus: Subscription 

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.isAuthenticated = this.authService.getIsAuthenticated();
    this.hasFamily = this.authService.getHasFamily();
    this.authStatus = this.authService.getAuthStatus().subscribe(isAuthenticated =>{
      this.isLoading = false;
      this.isAuthenticated = isAuthenticated;
    })
    if(!this.isAuthenticated) {
      this.router.navigate(['/login']);
    }
  }

  onTest() {
    this.router.navigate(["home", "test"]);
  }
  
  ngOnDestroy() {
    this.authStatus.unsubscribe();
  }

}
