import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../classes/User';
import { Task } from '../classes/Task';

@Injectable()
export class UserService implements OnInit {
  private baseUrl = 'https://teamsrate.herokuapp.com/api';

  constructor(private http: Http) { } 

  ngOnInit(): void {
    this.getUsers();
  }

  auth(user): Promise<User> {
    return this.http.post(this.baseUrl + '/users', user)
      .toPromise()
      .then(response => {
        var r = response.json();
        if (r.status == "ok") {
          user.id = r.id;
        }

        return user;
      })
      .catch(this.handleError);
  }

  isLoggedIn() {
    return window.localStorage.getItem('user') ? true : false;
  }

  getUsers(): Promise<User[]> {
    return this.http.get(this.baseUrl + '/users')
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getTasks(): Promise<Task[]> {
    return this.http.get(this.baseUrl + '/users/' + JSON.parse(window.localStorage.getItem('user')).id + '/tasks')
      .toPromise()
      .then(response => {
        let tasks = response.json();
        tasks.forEach(el => {
          switch (el.status) {
            case 0: el.status_text = "new"; break;
            case 1: el.status_text = "running"; break;
            case 2: el.status_text = "done"; break;
          }
        });
        return tasks;
      })
      .catch(this.handleError);
  }

  getTotalPoints(): Promise<number> {
    return this.http.get(this.baseUrl + '/users/' + JSON.parse(window.localStorage.getItem('user')).id + '/points')
      .toPromise()
      .then(response => +response.text())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
