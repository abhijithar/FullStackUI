import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { User } from '../core/models/user';
import { Task } from '../core/models/task';
import { Counter } from '../core/models/counter';
import { Project } from '../core/models/project';

import { ProjectService } from '../core/services/project.service';
import { CounterService } from '../core/services/counter.service';
import { UserService } from '../core/services/user.service';
import { TaskService } from '../core/services/task.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
  providers: [DatePipe]
})
export class ViewTaskComponent implements OnInit {

  // Component variables
  viewTaskForm: FormGroup;
  taskData: Task;
  taskList: Task[];
  projectData: Project;
  projectList: Project[];
  userData: User;
  userList: User[];
  counterData: Counter;
  validateControls: boolean = false;
  updateBtn: boolean = false;
  sortOrder: string = 'task';

  constructor(
    private projectSvc: ProjectService,
    private userSvc: UserService,
    private taskSvc: TaskService,
    private counterSvc: CounterService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe) { }

  ngOnInit() {


    // Define the from group for project
    this.viewTaskForm = this.formBuilder.group({
      project_Id: ['', Validators.required],
      project: ['', Validators.required]
    });

    // Get the list of projects
    this.getProjects();

    // Set the value changes subscription
    this.formControls.project_Id.valueChanges.subscribe(selection =>
      this.getTasks()
    );

  }

  // Convenience getter for easy access to form fields
  get formControls() { return this.viewTaskForm.controls; }

  // Get the list of projects
  getProjects() {

    // Get the list of Users
    this.projectSvc.getProject().subscribe(
      (res: Project[]) => {
        this.projectList = res;
      }
    );

  }

  getTasks() {

    // Get the list of Users
    this.taskSvc.getTask().subscribe(
      (res: Task[]) => {
        this.taskList = res;
      }
    );

  }

  onProjectSelected(project: Project) {
    this.formControls.project_Id.setValue(project.project_Id);
    this.formControls.project.setValue(project.project)
  }

  onSortByStartDate() {
    this.sortOrder = 'startDate';
  }

  onSortByEndDate() {
    this.sortOrder = 'endDate';
  }

  onSortByPriority() {
    this.sortOrder = 'priority';
  }

  onSortByStatus() {
    this.sortOrder = 'status';
  }


}
