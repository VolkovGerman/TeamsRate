import { Component, OnInit, Input } from '@angular/core';

import { Team } from '../classes/Team';

@Component({
  selector: 'app-teams-search',
  templateUrl: './teams-search.component.html',
  styleUrls: ['./teams-search.component.less']
})
export class TeamsSearchComponent implements OnInit {
  @Input() teams: Team[];

  constructor() { }

  ngOnInit() {
  }

}
