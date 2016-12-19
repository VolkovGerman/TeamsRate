import { Component, OnInit, OnChanges, Input } from '@angular/core';

import { Team } from '../classes/Team'; 

import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.less']
})
export class TeamsListComponent implements OnInit {
  @Input() teams: Team[] = [];
  emptyBox: boolean;

  constructor() {};

  ngOnInit() {
    this.emptyBox = this.teams ? (this.teams.length ? false : true) : true; 
  }

  ngOnChanges() {
    this.emptyBox = this.teams ? (this.teams.length ? false : true) : true; 
  }

}
