import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.less']
})
export class TeamPageComponent implements OnInit {
  createBlockVisible: boolean;

  constructor() {
    this.createBlockVisible = false;
  }

  ngOnInit() {
  }

  createTaskBlock__toogleVisibility() {
    this.createBlockVisible = !this.createBlockVisible;

    return false;
  }

}
