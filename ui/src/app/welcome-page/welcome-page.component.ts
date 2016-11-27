import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var OAuth;

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.less']
})
export class WelcomePageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  auth() {
    OAuth.initialize('BqvOnNnWfVNBT6eESGzK0zuBtCo');
    OAuth.popup('vk')
      .done((result) => {
        console.log(result); 

        let access_token = result.access_token;
        let user_id = result.user_id;
        let fields = 'bdate,sex';
        let version = '5.60';

        var query = `https://api.vk.com/method/users.get?access_token=${access_token}&user_ids=${user_id}&fields=${fields}&v=${version}`;

        result.get(query)
          .done((data) => {
            console.log(data);
          })
          .fail((err) => {
            console.log(err);
          })
      })
      .fail(function (err) {
        console.log(err);
      });

    return false;
  }

}
