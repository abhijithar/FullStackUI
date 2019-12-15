import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { Task } from '../core/models/task';
import { TaskService } from '../core/services/task.service';

@Component({
  selector: 'app-view-task-list-item',
  templateUrl: './view-task-list-item.component.html',
  styleUrls: ['./view-task-list-item.component.css'],
  providers: [DatePipe]
})
export class ViewTaskListItemComponent implements OnInit {

  @Input() taskData: Task;
  @Input() taskList: Task[];
  @Output() taskSelected = new EventEmitter();
  @Output() reloadTask = new EventEmitter();

  constructor(
    private datePipe: DatePipe,
    private taskSvc: TaskService,
    private routerSvc: Router
  ) { }

  ngOnInit() {

  }

  formatDate(date: Date) {
    let wrkDate = new Date(date);
    return (this.datePipe.transform(wrkDate, 'yyyy-MM-dd'));
  }

  findParentDesc(taskId) {

    if (taskId !== '') {

      for (var i = 0; i < this.taskList.length; i++) {
        if (this.taskList[i].task_Id == taskId) {
          return this.taskList[i].task;
        }
      }
    }

  }

  onCompleteTask(taskData: Task) {

    taskData.status = 'Completed';
    // Invoke the addUser service method for adding the user details
    this.taskSvc.updateTask(taskData).subscribe(
      (res: any) => {
      }
    );

  }

  // Component method for editing the Task
  onEditTask(taskData: Task) {
    this.routerSvc.navigate(['/task', taskData.task_Id]);
  }

}
