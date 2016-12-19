import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Team } from '../classes/Team';
import { Task } from '../classes/Task';
import { User } from '../classes/User';

@Injectable()
export class TeamService implements OnInit {
  private baseUrl = 'http://localhost:9000/api';//'http://teamsrate.herokuapp.com/api';

  constructor(private http: Http) { } 

  ngOnInit(): void {
  }

  add(name, descr): Promise<any> {
    return this.http.post(this.baseUrl + '/teams', {
      id: 0,
      name: name,
      descr: descr,
      creator_id: JSON.parse(window.localStorage.getItem('user')).id
    }).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getAll(): Promise<Team[]> { 
    return this.http.get(this.baseUrl + '/teams')
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getTeamInfo(teamID): Promise<Team> {
    return this.http.get(this.baseUrl + '/teams/' + teamID)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  delete(teamID): Promise<void> {
    return this.http.delete(this.baseUrl + '/teams/' + teamID)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  checkAccess(teamID): Promise<boolean> {
    return this.http.post(this.baseUrl + '/teams/check_member', {
      id: 0,
      user_id: JSON.parse(window.localStorage.getItem('user')).id,
      team_id: teamID,
      points: 0
    }).toPromise()
      .then(response => {
        console.log("AAAAAAAA" + JSON.stringify(response.json()))
        return response.json() ? true : false;
      })
      .catch(this.handleError);
  }

  getTeamsForUser(): Promise<Team[]> { 
    let id = JSON.parse(window.localStorage.getItem('user')).id;
    console.log("IIIDDD: " + id);

    return this.http.get(this.baseUrl + '/users/' + id + '/teams')
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  } 

  getMembers(teamID): Promise<User[]> {
    return this.http.get(this.baseUrl + '/teams/' + teamID + '/users')
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  subscribeForTeam(teamID): Promise<void> {
    return this.http.post(this.baseUrl + '/teams/user', {
      id: 0,
      user_id: JSON.parse(window.localStorage.getItem('user')).id,
      team_id: teamID,
      points: 0
    }).toPromise()
      .then(response => {
        console.log(response.json());
        response.json()
      })
      .catch(this.handleError);
  }

  unsubscribeFromTeam(teamID): Promise<void> {
    var userID = JSON.parse(window.localStorage.getItem('user')).id;

    return this.http.delete(this.baseUrl + '/teams/' + teamID + '/user/' + userID)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  updateInfo(newTeam): Promise<void> {
    return this.http.put(this.baseUrl + '/teams', {
      id: newTeam.id,
      name: newTeam.name,
      descr: newTeam.descr,
      creator_id: newTeam.creator_id
    })
    .toPromise()
    .then(response => {
      console.log(response.json());
      response.json().status == "ok"
    })
    .catch(this.handleError);
  } 

  getTasks(teamID): Promise<Task[]> {
    return this.http.get(this.baseUrl + '/teams/' + teamID + '/tasks')
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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
