import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { Task } from '../classes/Task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less']
})
export class TaskListComponent implements OnInit {
  @Input() listHeader: string;
  @Input() tasks: Task[] = [];
  @Output() updateTaskEvent = new EventEmitter();
  selectedTask: Task;
  emptyList: boolean;

  constructor() {
  }

  ngOnInit() {
    this.emptyList = this.tasks ? (this.tasks.length ? false : true) : true; 
  }

  ngOnChanges() {
    this.emptyList = this.tasks ? (this.tasks.length ? false : true) : true; 
  }

  selectTask(task) {
    this.selectedTask = task;
  }

  unselectTask() {
    this.selectedTask = null;
  }

  updateTasksEvent() {
    this.updateTaskEvent.emit();
  }

}
