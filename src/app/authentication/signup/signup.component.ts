import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  
  isLoading = false;
  password: string = "";
  passwordConfirm: string = "";
  passwordMatch = true;
  error = false;
  noRole: boolean = false;
  role: string;
  private authStatus: Subscription

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.authStatus = this.authService.getAuthStatus().subscribe(authStatus => {
      this.password = "";
      this.passwordConfirm = "";
      this.error = !authStatus
      this.isLoading = false;
    })
  }

  onSignup(form: NgForm) {
    if(!this.role) {
      this.noRole = true;
      return;
    } else {
      this.noRole = false;
    }
    if(!form.valid)
    {
      return;
    }
    if(this.password !== this.passwordConfirm) {
      this.passwordMatch = false;
      console.log(this.passwordMatch)
      return;
    }
    this.isLoading = true;
    this.authService.signup(form.value.username, form.value.email, form.value.password, form.value.passwordConfirm, this.role)
  }

  resetMatch(){
    this.passwordMatch = true;
  }

  ngOnDestroy() {
    this.authStatus.unsubscribe();
  }
}
