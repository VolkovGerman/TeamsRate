import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

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
export class DashboardComponent implements OnInit, CanActivate {
  teams: Team[];
  teamsForUser: Team[];
  todos: Task[];

  constructor(private teamService: TeamService, private userService: UserService, private router: Router) {
    this.updateTeams();

    this.userService.getTasks().then(tasks => {
      this.todos = tasks;
    });
  }

  ngOnInit() {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('user')) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['']);
    console.log("You are not logged in!");
    return false;
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
