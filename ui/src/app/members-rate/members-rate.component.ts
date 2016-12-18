import { Component, OnInit, Input } from '@angular/core';

import { User } from '../classes/User';

import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-members-rate',
  templateUrl: './members-rate.component.html',
  styleUrls: ['./members-rate.component.less'],
  providers: [
    TeamService
  ]
})
export class MembersRateComponent implements OnInit {
  members: User[];
  @Input() pageID: number;

  constructor(private teamService: TeamService) {
  }

  ngOnInit() {
    this.teamService.getMembers(this.pageID).then(users => this.members = users);
  }

}
