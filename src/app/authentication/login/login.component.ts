import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;
  error = false;
  private authStatus: Subscription
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authStatus = this.authService.getAuthStatus().subscribe(authStatus => {
      this.isLoading = false;
      this.error = !authStatus;
    })
  }

  onLogin(form: NgForm) {
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password)
  }

  ngOnDestroy() {
    this.authStatus.unsubscribe();
  }
}
