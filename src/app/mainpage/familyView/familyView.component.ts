import { Component, OnInit } from '@angular/core';
import { FamilyService } from '../family.service';
import { Family, User } from 'src/app/models/family.model';

@Component({
  selector: 'app-familyView',
  templateUrl: './familyView.component.html',
  styleUrls: ['./familyView.component.css'],
})
export class FamilyViewComponent implements OnInit {
  isLoading = false;
  family: Family = {
    users: [
      {
        _id: '',
        email: '',
        name: '',
      },
    ],
    groceries: [''],
    toDoList: [''],
    _id: '',
    name: '',
    inviteToken: '',
  };
  users: [User];

  constructor(private familyService: FamilyService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.familyService.getMyFamily().subscribe((res) => {
      this.users = res.data.family.users;
      this.familyService.family = res.data.family;
      this.family = res.data.family;
      this.isLoading = false;
    });
  }
}
