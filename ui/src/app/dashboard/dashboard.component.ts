import { Component, OnInit } from '@angular/core';

import { Task } from '../classes/Task';
import { Team } from '../classes/Team';

import { TeamService } from '../services/team.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  providers: [
    TeamService,
    UserService
  ]
})
export class DashboardComponent implements OnInit {
  teams: Team[];
  teamsForUser: Team[];
  todos: Task[];

  constructor(private teamService: TeamService, private userService: UserService) {
    this.updateTeams();

    this.userService.getTasks().then(tasks => {
      this.todos = tasks;
    });
  }

  ngOnInit() {
  }

  updateTeams() {
    this.teamService.getAll().then(teams => {
      console.log(teams);
      this.teams = teams;
    });

    this.teamService.getTeamsForUser().then(teams => {
      this.teamsForUser = teams;
    });
  }

}
