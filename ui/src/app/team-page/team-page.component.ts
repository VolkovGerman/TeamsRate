import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Team } from '../classes/Team';
import { Task } from '../classes/Task';

import { TeamService } from '../services/team.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.less'],
  providers: [
    TeamService
  ]
})
export class TeamPageComponent implements OnInit {
  activeTab: string;
  tasksTab: string;
  pageID: number;
  teamName: string;
  teamDescr: string;
  access: boolean;
  tasks = {
    new: [],
    running: [],
    done: []
  };

  constructor(private route: ActivatedRoute, private router: Router, private teamService: TeamService) {
    this.access = false;
    this.activeTab = 'tasks';
    this.tasksTab = 'new';
  }

  ngOnInit() {
    this.pageID = +this.route.snapshot.params['id'];

    this.checkAccess();

    this.teamService.getTeamInfo(this.pageID).then(teamInfo => {
      this.teamName = teamInfo.name;
      this.teamDescr = teamInfo.descr;
    });

    this.updateTasks();
  }

  checkAccess() {
    this.teamService.checkAccess(this.pageID).then(result => {
      console.log(result);
      this.access = result
    });
  }

  activateTab(tabName: string) {
    this.activeTab = tabName;

    return false;
  }

  subscribe() {
    if (!this.access) {
      this.teamService.subscribeForTeam(this.pageID).then(() => {
        this.checkAccess();
      });
    } else {
      this.teamService.unsubscribeFromTeam(this.pageID).then(() => {
        this.checkAccess();
      });
    }
  }

  teamInfoUpdated(newTeamInfo) {
    this.teamName = newTeamInfo.name;
    this.teamDescr = newTeamInfo.descr;
  }

  updateTasks() {
    this.teamService.getTasks(this.pageID).then(taskList => {
      this.tasks.new = taskList.filter((val) => val.status == 0);
      this.tasks.running = taskList.filter((val) => val.status == 1);
      this.tasks.done = taskList.filter((val) => val.status == 2);
    }); 
  }

}
