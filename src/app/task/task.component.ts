import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  counterData: Counter;
  validateControls: boolean = false;
  updateBtn: boolean = false;
  loadDetails: number = 0;

  constructor(
    private projectSvc: ProjectService,
    private userSvc: UserService,
    private taskSvc: TaskService,
    private counterSvc: CounterService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    // Define the from group for project
    this.taskForm = this.formBuilder.group({
      task_Id: [''],
      project_Id: ['', Validators.required],
      project: [''],
      task: ['', Validators.required],
      parentTask: [false],
      priority: [{ value: 0, disabled: true }, Validators.required],
      parentTask_Id: [{ value: '', disabled: true }, Validators.required],
      parentTaskDesc: [''],
      startDate: [{ value: '', disabled: true }, Validators.required],
      endDate: [{ value: '', disabled: true }, Validators.required],
      user_Id: [{ value: '', disabled: true }, Validators.required],
      userName: [''],
      status: [''],
      loadDetails: [0]
    });

    // Get the list of projects
    this.getProjects();

    // Get the list of Users
    this.getUsers();

    // Get the list of Tasks
    this.getTasks();

    // Set the value changes subscription
    this.formControls.parentTask.valueChanges.subscribe(selection =>
      this.setParentTask(selection)
    );

    // Set the value changes subscription
    this.formControls.loadDetails.valueChanges.subscribe(number =>
      this.route.params.subscribe(params => {

        if (number === 3)
          this.getTaskDetails(params);

      })
    );

  }

  getTaskDetails(params) {

    if (params.taskId !== undefined) {

      this.updateBtn = true;

      for (var i = 0; i < this.taskList.length; i++) {
        if (this.taskList[i].task_Id == params.taskId) {

          this.taskForm.patchValue({
            task_Id: this.taskList[i].task_Id,
            project_Id: this.taskList[i].project_Id,
            project: this.findProject(this.taskList[i].project_Id),
            task: this.taskList[i].task,
            parentTask: this.taskList[i].parentTask,
            priority: this.taskList[i].priority,
            parentTask_Id: this.taskList[i].parentTask_Id,
            parentTaskDesc: this.findTask(this.taskList[i].parentTask_Id),
            startDate: this.taskList[i].startDate ? this.formatDate(this.taskList[i].startDate) : null,
            endDate: this.taskList[i].startDate ? this.formatDate(this.taskList[i].endDate) : null,
            status: this.taskList[i].status,
            user_Id: this.taskList[i].user_Id,
            userName: this.findUserName(this.taskList[i].user_Id)
          });

        }
      }

    }

  }

  // Convenience getter for easy access to form fields
  get formControls() { return this.taskForm.controls; }

  // Get the list of projects
  getProjects() {

    // Get the list of Users
    this.projectSvc.getProject().subscribe(
      (res: Project[]) => {
        this.projectList = res;
        this.formControls.loadDetails.setValue(this.formControls.loadDetails.value + 1);
      }
    );

  }

  getUsers() {

    // Get the list of Users
    this.userSvc.getUser().subscribe(
      (res: User[]) => {
        this.userList = res;
        this.formControls.loadDetails.setValue(this.formControls.loadDetails.value + 1);
      }
    );

  }

  getTasks() {

    // Get the list of Users
    this.taskSvc.getTask().subscribe(
      (res: Task[]) => {
        this.taskList = res;
        this.formControls.loadDetails.setValue(this.formControls.loadDetails.value + 1);
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

    this.validateControls = true;
    console.log(this.taskForm.value);


    if (this.taskForm.invalid) {
      return
    } else {

      // Assign the model from the form values
      this.taskData = this.taskForm.value;
      this.taskData.project_Id = this.formControls.project_Id.value;
      this.taskData.user_Id = this.formControls.user_Id.value;
      this.taskData.parentTask_Id = this.formControls.parentTask_Id.value;


      this.counterData = new Counter('TaskId', '', 0);
      this.counterSvc.getNextId(this.counterData).subscribe(
        (res: Counter) => {

          this.taskData.task_Id = res.prefix + res.sequenceVal;

          // Invoke the addUser service method for adding the user details
          this.taskSvc.addTask(this.taskData).subscribe(
            (res: any) => {
              this.taskForm.reset();
              this.validateControls = false;
            }
          );

        })
        
      // Get the list of Tasks
      this.getTasks();

    }

  }

  onUpdateTask() {

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
      this.taskSvc.updateTask(this.taskData).subscribe(
        (res: any) => {
          this.taskForm.reset();
          this.validateControls = false;
        }
      );

    }

  }

  onUserSelected(user: User) {
    this.formControls.user_Id.setValue(user.user_Id);
    this.formControls.userName.setValue(this.findUserName(user.user_Id));
  }

  onProjectSelected(project: Project) {
    this.formControls.project_Id.setValue(project.project_Id);
    this.formControls.project.setValue(project.project)
  }

  onTaskSelected(task: Task) {
    this.formControls.parentTask_Id.setValue(task.task_Id);
    this.formControls.parentTaskDesc.setValue(this.findParentDesc(task.task_Id));
  }

  findParentDesc(taskId) {
    for (var i = 0; i < this.taskList.length; i++) {
      if (this.taskList[i].task_Id == taskId) {
        return this.taskList[i].task;
      }
    }

  }

  findUserName(userId) {

    for (var i = 0; i < this.userList.length; i++) {
      if (this.userList[i].user_Id == userId) {
        return this.userList[i].firstName + ' ' + this.userList[i].lastName;
      }
    }

  }

  findProject(projectId) {

    for (var i = 0; i < this.projectList.length; i++) {
      if (this.projectList[i].project_Id == projectId) {
        return this.projectList[i].project;
      }
    }

  }

  findTask(taskId) {

    for (var i = 0; i < this.taskList.length; i++) {
      if (this.taskList[i].task_Id == taskId) {
        return this.taskList[i].task;
      }
    }

  }

  formatDate(date) {
    let wrkDate = new Date(date);
    return (this.datePipe.transform(wrkDate, 'yyyy-MM-dd'));
  }

  onReset() {

    this.validateControls = false;
    this.taskForm.reset();

  }

}
