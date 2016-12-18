import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Team } from '../classes/Team';

import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-team-settings',
  templateUrl: './team-settings.component.html',
  styleUrls: ['./team-settings.component.less'],
  providers: [
    TeamService
  ]
})
export class TeamSettingsComponent implements OnInit {
  @Input() teamName: string;
  @Input() teamDescr: string;
  @Input() teamID: number;
  @Output() teamInfoUpdated = new EventEmitter();
  newTeamInfo: Team;

  constructor(private teamService: TeamService) {    
  }

  ngOnInit() {
  }

  updateTeam(name: string, descr: string) {
    this.newTeamInfo = new Team(this.teamID, name, descr);
    console.log(this.newTeamInfo);

    this.updateInfo();

    this.teamInfoUpdated.emit(this.newTeamInfo);
  }

  updateInfo() {
    this.teamService.updateInfo(this.newTeamInfo).then(() => {
      this.teamName = this.newTeamInfo.name;
      this.teamDescr = this.newTeamInfo.descr;
    });
  }


}

