import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  isLoading = false;
  password: string = "";
  passwordConfirm: string = "";
  passwordMatch = true;

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  onSignup(form: NgForm) {
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
    this.authService.signup(form.value.username, form.value.email, form.value.password, form.value.passwordConfirm)
  }

  resetMatch(){
    this.passwordMatch = true;
  }
}
