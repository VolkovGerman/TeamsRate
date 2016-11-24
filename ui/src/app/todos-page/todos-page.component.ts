import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.less']
})
export class TodosPageComponent implements OnInit {
  taskStatus : string;

  constructor() {
    this.taskStatus = "in progress";
  }

  ngOnInit() {
  }

}
