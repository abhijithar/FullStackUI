import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { User } from '../core/models/user';
import { Task } from '../core/models/task';
import { Project } from '../core/models/project';

import { ProjectService } from '../core/services/project.service';
import { UserService } from '../core/services/user.service';
import { TaskService } from '../core/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [DatePipe]
})
export class TaskComponent implements OnInit {

  // Component variables
  taskForm: FormGroup;
  taskData: Task;
  taskList: Task[];
  projectData: Project;
  projectList: Project[];
  userData: User;
  userList: User[];
  validateControls: boolean = false;
  updateBtn: boolean = false;

  constructor(
    private projectSvc: ProjectService,
    private userSvc: UserService,
    private taskSvc: TaskService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {

    // Define the from group for project
    this.taskForm = this.formBuilder.group({
      project_Id: ['', Validators.required],
      task: ['', Validators.required],
      parentTask: [false],
      priority: [{ value: 0, disabled: true }, Validators.required],
      parentTask_Id: [{ value: '', disabled: true }, Validators.required],
      startDate: [{ value: '', disabled: true }, Validators.required],
      endDate: [{ value: '', disabled: true }, Validators.required],
      user_Id: [{ value: '', disabled: true }, Validators.required],
    });

    // Get the list of projects
    this.getProjects();

    // Get the list of Users
    this.getUsers();

    // Set the value changes subscription
    this.formControls.parentTask.valueChanges.subscribe(selection =>
      this.setParentTask(selection)
    );

  }

  // Convenience getter for easy access to form fields
  get formControls() { return this.taskForm.controls; }

  // Get the list of projects
  getProjects() {

    // Get the list of Users
    this.projectSvc.getProject().subscribe(
      (res: Project[]) => {
        this.projectList = res;
      }
    );

  }

  getUsers() {

    // Get the list of Users
    this.userSvc.getUser().subscribe(
      (res: User[]) => {
        this.userList = res;
      }
    );

  }

  setParentTask(enable) {

    if (!enable) {
      this.formControls.priority.enable();
      this.formControls.startDate.enable();
      this.formControls.endDate.enable();
      let wrkDate = new Date();
      this.formControls.startDate.setValue(this.datePipe.transform(wrkDate, 'yyyy-MM-dd'));
      wrkDate.setDate(wrkDate.getDate() - 1);
      this.formControls.endDate.setValue(this.datePipe.transform(wrkDate, 'yyyy-MM-dd'));
    } else {
      this.formControls.priority.disable();
      this.formControls.startDate.disable();
      this.formControls.endDate.disable();
      this.formControls.startDate.reset();
      this.formControls.endDate.reset();
    }

  }

  onAddTask() {

    console.log(this.taskForm.value);

    this.validateControls = true;

    if (this.taskForm.invalid) {
      return
    } else {

      // Assign the model from the form values
      this.taskData = this.taskForm.value;
      this.taskData.project_Id = this.formControls.project_Id.value;
      this.taskData.user_Id = this.formControls.user_Id.value;
      this.taskData.parentTask_Id = this.formControls.parentTask_Id.value;

      // Invoke the addUser service method for adding the user details
      this.taskSvc.addTask(this.taskData).subscribe(
        (res: any) => {
          this.taskForm.reset();
          this.validateControls = false;
        }
      );

    }

  }

  onUserSelected(user: User) {
    this.formControls.user_Id.setValue(user.user_Id)
  }

  onProjectSelected(project: Project) {
    this.formControls.project_Id.setValue(project.project_Id)
  }

}
