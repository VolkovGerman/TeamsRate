import { Component, OnInit } from '@angular/core';

import { Task } from '../classes/Task';
import { Team } from '../classes/Team';

import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  providers: [
    TeamService
  ]
})
export class DashboardComponent implements OnInit {
  teams: Team[];
  
  tasks: Task[];
  selectedTask: Task;

  constructor(private teamService: TeamService) {
    /*this.tasks = [
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
    ];*/

    this.teamService.getAll().then(teams => {
      console.log(teams);
      this.teams = teams;
    });
  }

  ngOnInit() {
  }

  onTaskSelect(task: Task): void {
    this.selectedTask = task;
  }

}
