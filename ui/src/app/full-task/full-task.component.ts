import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Task } from '../classes/Task';

import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-full-task',
  templateUrl: './full-task.component.html',
  styleUrls: ['./full-task.component.less'],
  providers: [
    TaskService
  ]
})
export class FullTaskComponent implements OnInit {
  @Input() selectedTask: Task;
  @Output() closeTaskEvent = new EventEmitter();
  @Output() updateTaskEvent = new EventEmitter();

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  close() {
    this.closeTaskEvent.emit();
  }

  setAsPerformer() {
    this.taskService.setPerformer(this.selectedTask.id).then(() => {
      this.updateTaskEvent.emit();
      this.close();
    })
  }

  setAsDone() {
    this.taskService.setDone(this.selectedTask.id).then(() => {
      this.updateTaskEvent.emit();
      this.close();
    });
  }

  removeTask() {
    this.taskService.remove(this.selectedTask.id).then(() => {
      this.updateTaskEvent.emit();
      this.close();
    });
  }

}
