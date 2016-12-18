import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Team } from '../classes/Team';

import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-team-builder',
  templateUrl: './team-builder.component.html',
  styleUrls: ['./team-builder.component.less'],
  providers: [
    TeamService
  ]
})
export class TeamBuilderComponent implements OnInit {
  @Output() teamCreatedEvent = new EventEmitter(); 

  constructor(private teamService: TeamService) { }

  ngOnInit() {
  }

  createTeam(name, descr) {
    this.teamService.add(name, descr).then(result => {
      this.teamCreatedEvent.emit();

      this.teamService.subscribeForTeam(result.id).then(() => {
        this.teamCreatedEvent.emit();
      });
    });
  }

  onSubmit(event:any): void {
    event.target.reset();
  }

}
