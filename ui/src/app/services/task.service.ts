import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Task } from '../classes/Task';

@Injectable()
export class TaskService implements OnInit{
  private baseUrl = 'http://localhost:9000/api';//'http://teamsrate.herokuapp.com/api';

  constructor(private http: Http) { } 

  ngOnInit(): void {
  }

  add(newTask: Task): Promise<void> { 
    return this.http.post(this.baseUrl + '/tasks', newTask)
               .toPromise()
               .then(response => {
                 console.log(response);
                 response.json()
                })
               .catch(this.handleError);
  }

  setPerformer(taskID: number): Promise<void> {
    return this.http.post(this.baseUrl + '/tasks/' + taskID, {
      performer_id: JSON.parse(window.localStorage.getItem('user')).id
    })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  setDone(taskID: number): Promise<void> {
    return this.http.post(this.baseUrl + '/tasks/' + taskID + '/done', {
      status: 2
    })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  remove(taskID: number): Promise<void> { 
    return this.http.delete(this.baseUrl + '/tasks/' + taskID)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  } 

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
