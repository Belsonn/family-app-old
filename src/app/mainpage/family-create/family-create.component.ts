import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/authentication/auth.service';
import { FamilyService } from '../family.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-family-create',
  templateUrl: './family-create.component.html',
  styleUrls: ['./family-create.component.css']
})
export class FamilyCreateComponent implements OnInit, OnDestroy{

  error: boolean = false;
  errorSub: Subscription 
  constructor(private authService: AuthService,  private familyService: FamilyService) { }

  ngOnInit(): void {
    this.errorSub = this.familyService.getTokenError().subscribe(isError => {
      this.error = isError;
    })
  }

  onCreate(form : NgForm) {
    this.familyService.createFamily(form.value.name);
  }
   onJoin(form : NgForm) {
    this.familyService.joinFamily(form.value.inviteToken);
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
