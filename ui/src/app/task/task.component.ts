import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../shared/Task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Output() taskClose = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

  close() {
    this.taskClose.emit();
  }

}
