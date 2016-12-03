import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/Task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  tasks: Task[];
  selectedTask: Task;

  constructor() {
    this.tasks = [
      {
        id: 1,
        text: 'do dishes',
        deadline: '01.12.2016',
        status: 'new',
        points: 20,
        team: "OneWayUp"
      },
      {
        id: 2,
        text: 'win a game of thrones',
        deadline: '01.12.2016',
        status: 'new',
        points: 20,
        team: "OneWayUp"
      },
      {
        id: 3,
        text: 'go to the shop',
        deadline: '01.12.2016',
        status: 'new',
        points: 20,
        team: "OneWayUp"
      }
    ];
  }

  ngOnInit() {
  }

  onTaskSelect(task: Task): void {
    this.selectedTask = task;
  }

}
