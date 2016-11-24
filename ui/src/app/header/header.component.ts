import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  menu: Object;
  @Input() activeMenuItem: string;

  constructor() {
    //this.activeMenuItem = 'feed';
    
    this.menu = {
      search: {
        link: '/search',
        active: false
      },
      settings: {
        link: '/settings',
        active: false
      },
      exit: {
        link: '/exit',
        active: false
      },
      feed: {
        link: '/feed',
        active: false
      },
      todos: {
        link: '/todos',
        active: false
      },
      teams: {
        link: '/teams',
        active: false
      }
    }
  }

  ngOnInit() {
    this.menu[this.activeMenuItem].active = true;
  }

}
