import { Component, OnInit } from '@angular/core';
import { faPlus, faTag, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FamilyService } from '../family.service';

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
  todos: string[] = [];
  constructor(private familyService: FamilyService) {}

  ngOnInit(): void {
      this.todos = this.familyService.family.groceries;
  }

  handleAdd() {
    if (this.todo) {
      this.familyService
        .addToList('groceries', this.todo)
        .subscribe((result) => {
          this.todos = result.data.family.groceries;
        });
    }
  }
}
