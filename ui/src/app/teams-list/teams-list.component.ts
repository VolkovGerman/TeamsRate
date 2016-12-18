import { Component, OnInit, Input } from '@angular/core';

import { Team } from '../classes/Team';

import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.less']
})
export class TeamsListComponent implements OnInit {
  @Input() teams: Team[];

  constructor() { }

  ngOnInit() { }

}
