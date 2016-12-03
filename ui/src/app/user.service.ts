import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './shared/User';

@Injectable()
export class UserService implements OnInit {
  private baseUrl = 'http://teamsrate.herokuapp.com/api';

  constructor(private http: Http) { } 

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): Promise<User[]> {
    return this.http.get(this.baseUrl + '/users')
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
