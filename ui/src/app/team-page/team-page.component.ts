import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.less']
})
export class TeamPageComponent implements OnInit {
  activeTab: string;

  constructor() {
    this.activeTab = 'tasks';
  }

  ngOnInit() {
  }

  activateTab(tabName: string) {
    this.activeTab = tabName;

    return false;
  }

}
