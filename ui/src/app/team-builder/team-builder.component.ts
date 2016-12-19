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
  opened: boolean;
  createdTeam = {
    name: '',
    descr: ''
  };

  constructor(private teamService: TeamService) {
    this.opened = false;
  }

  ngOnInit() {
  }

  trigger() {
    this.opened = !this.opened;
  }

  createTeam() {
    this.teamService.add(this.createdTeam.name, this.createdTeam.descr).then(result => {
      
      console.log(result);
      this.teamCreatedEvent.emit();

      this.teamService.subscribeForTeam(result.id).then(() => {
        this.teamCreatedEvent.emit();
      });
    });
  }

  onSubmit(event:any): void {
    this.createTeam();
    event.target.reset();
  }

}
