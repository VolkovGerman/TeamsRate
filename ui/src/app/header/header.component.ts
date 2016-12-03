import { Component, OnInit, Input } from '@angular/core';

class MenuItem {
  name: string;
  link: string;
  active: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  menu: Array<MenuItem>;
  @Input() activeMenuItem: number;

  constructor() {    
    this.menu = [
      {
        name: 'dashboard',
        link: '/dashboard',
        active: false
      },
      {
        name: 'settings',
        link: '/settings',
        active: false
      }, 
      {
        name: 'exit',
        link: '/exit',
        active: false
      }
    ]
  }

  ngOnInit() {
    if (this.menu[this.activeMenuItem] != undefined) {
      this.menu[this.activeMenuItem].active = true; 
    }
  }

}
 