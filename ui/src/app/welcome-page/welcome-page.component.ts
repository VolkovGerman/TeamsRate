import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../classes/User';

import { UserService } from '../services/user.service';

declare var OAuth;

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.less'],
  providers: [
    UserService
  ]
})
export class WelcomePageComponent implements OnInit {
  authButton_google: Boolean;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.authButton_google = false;
  }

  ngOnInit() {
  }

  auth() {
    let that = this;

    OAuth.initialize('BqvOnNnWfVNBT6eESGzK0zuBtCo');
    OAuth.popup('google').done((result) => {
      console.log(result); 

      result.me().done(function(data) {
        console.log(data);

        let user = {
          id: 0,
          name: data.firstname,
          surname: data.lastname,
          photo_url: data.avatar,
          gp_id: data.id
        }

        that.userService.auth(user).then(user => {
          console.log(user);
          
          window.localStorage.setItem('user', JSON.stringify(user));

          that.router.navigate(['/dashboard']);
        });

      })
    });
  } 

  authClick() {
    this.authButton_google = !this.authButton_google;

    this.auth();

    return false;
  }

}
