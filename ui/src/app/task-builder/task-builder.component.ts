import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Task } from '../classes/Task';

import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-builder',
  templateUrl: './task-builder.component.html',
  styleUrls: ['./task-builder.component.less'],
  providers: [
    TaskService
  ]
})
export class TaskBuilderComponent implements OnInit {
  @Input() teamID: number;
  @Output() taskCreated = new EventEmitter();
  newTask: Task;
  opened: boolean;
  createTaskForm = {
    text: '',
    deadline: '',
    points: 0
  };

  constructor(private taskService: TaskService) {  
    this.opened = false;  
  }

  ngOnInit() {
  }

  trigger() {
    this.opened = !this.opened;
  }

  createTask() {
    this.newTask = new Task(
      0, 
      this.teamID, 
      JSON.parse(window.localStorage.getItem('user')).id, 
      -1,
      this.createTaskForm.text, 
      this.createTaskForm.deadline, 
      0, 
      +this.createTaskForm.points
    );

    this.taskService.add(this.newTask).then(() => {
      console.log("Task was added");
      this.taskCreated.emit();
    });
  }

  onSubmit(event:any): void {
    this.createTask();
    event.target.reset();
  }


}

