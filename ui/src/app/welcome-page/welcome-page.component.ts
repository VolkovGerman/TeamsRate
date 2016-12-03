import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

declare var OAuth;

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.less']
})
export class WelcomePageComponent implements OnInit {
  authButton_google: Boolean;

  constructor(private route: ActivatedRoute, private router: Router) {
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

        that.router.navigate(['/dashboard']);
      })
    });
  } 

  authClick() {
    this.authButton_google = !this.authButton_google;

    this.auth();

    return false;
  }

}
