import { Component, OnInit } from '@angular/core';

import { User } from '../shared/User';

import { UserService } from '../user.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.less'],
  providers: [UserService]
})
export class SearchPageComponent implements OnInit {
  activeTab: string;
  users: User[];

  constructor(private userService: UserService) {
    this.activeTab = 'users';

    this.userService.getUsers().then(users => {
      console.log(users);
      this.users = users;
    });
  }

  ngOnInit() {
  }

  triggerTab(value) {
    this.activeTab = value;
  }

}
