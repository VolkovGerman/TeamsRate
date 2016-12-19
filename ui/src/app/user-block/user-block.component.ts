import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-block',
  templateUrl: './user-block.component.html',
  styleUrls: ['./user-block.component.less'],
  providers: [
    UserService
  ]
})
export class UserBlockComponent implements OnInit {
  totalPoints: number;
  user = {
    name: '',
    photo: '',
    gp: ''
  };

  constructor(private userService: UserService) {
    this.totalPoints = 0;

    let userStorage = JSON.parse(window.localStorage.getItem('user'));

    this.user.name = userStorage.name + " " + userStorage.surname;
    this.user.photo = userStorage.photo_url;
    this.user.gp = userStorage.gp_id;
  }

  ngOnInit() {
    this.updatePoints();
  }

  updatePoints() {
    this.userService.getTotalPoints().then(points => {
      this.totalPoints = points; 
    });
  }

}
