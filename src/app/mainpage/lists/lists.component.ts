import { Component, OnInit } from '@angular/core';
import { faPlus, faTag, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FamilyService } from '../family.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
  faPlus = faPlus;
  faTag = faTag;
  faCheck = faCheck;
  todo = '';
  todo1 = '';
  todos: string[] = [];
  groceries: string[] = [];
  constructor(private familyService: FamilyService, private router: Router) {}

  ngOnInit(): void {
    if (!this.familyService.family) {
      this.router.navigate(['home, family']);
    } else {
      this.groceries = this.familyService.family.groceries;
      this.todos = this.familyService.family.toDoList;
    }
  }

  handleAdd(listName: string) {
    if (listName === 'groceries') {
      if (this.todo) {
        this.groceries.push(this.todo);
        this.familyService
          .updateList('groceries', this.groceries)
          .subscribe((result) => {
            this.groceries = result.data.family.groceries;
          });
      }
    } else if (listName === 'toDoList') {
      if (this.todo1) {
        this.todos.push(this.todo1);
        this.familyService
          .updateList('toDoList', this.todos)
          .subscribe((result) => {
            this.todos = result.data.family.toDoList;
          });
      }
    }
  }

  removeItem(listName: string, index: number) {
    if (listName === 'groceries') {
      this.groceries.splice(index, 1);
      this.familyService
        .updateList('groceries', this.groceries)
        .subscribe((res) => {});
    } else if (listName === 'toDoList') {
      this.todos.splice(index, 1);
      this.familyService
        .updateList('toDoList', this.todos)
        .subscribe((res) => {});
    }
  }
}
