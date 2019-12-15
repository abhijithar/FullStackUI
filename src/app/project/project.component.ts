import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { User } from '../core/models/user';
import { Project } from '../core/models/project';
import { Counter } from '../core/models/counter';

import { ProjectService } from '../core/services/project.service';
import { UserService } from '../core/services/user.service';
import { CounterService } from '../core/services/counter.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [DatePipe]
})
export class ProjectComponent implements OnInit {

  // Component variables
  projectForm: FormGroup;
  projectData: Project;
  projectList: Project[];
  userData: User;
  userList: User[];
  counterData: Counter;
  sortOrder: string = 'project';
  validateControls: boolean = false;
  updateBtn: boolean = false;

  constructor(
    private projectSvc: ProjectService,
    private userSvc: UserService,
    private counterSvc: CounterService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {

    this.updateBtn = false;

    // Define the from group for project
    this.projectForm = this.formBuilder.group({
      project_Id: [''],
      project: ['', Validators.required],
      setDates: [false],
      startDate: [{ value: '', disabled: true }, Validators.required],
      endDate: [{ value: '', disabled: true }, Validators.required],
      priority: [''],
      manager_Id: ['', Validators.required]
    });

    // Get the list of projects
    this.getProjects();

    // Get the list of Users
    this.getUsers();

    // Set the value changes subscription
    this.formControls.setDates.valueChanges.subscribe(selection =>
      this.setDateStatus(selection)
    );

  }

  // Convenience getter for easy access to form fields
  get formControls() { return this.projectForm.controls; }

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

  // Component method for adding a new User
  onReset() {

    this.validateControls = false;
    this.projectForm.reset();

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

  onSortByCompleted() {
    this.sortOrder = 'completed';
  }

  onProjectSelected(projectData: Project) {

    if (projectData !== null) {

      let strDate = new Date(projectData.startDate);
      let endDate = new Date(projectData.endDate);

      this.projectForm.patchValue({
        project: projectData.project,
        startDate: this.datePipe.transform(strDate, 'yyyy-MM-dd'),
        endDate: this.datePipe.transform(endDate, 'yyyy-MM-dd'),
        priority: projectData.priority,
        manager_Id: projectData.manager_Id
      });
      this.updateBtn = true;
    }

  }

  setDateStatus(enable) {
    if (enable) {
      this.formControls.startDate.enable();
      this.formControls.endDate.enable();
      let wrkDate = new Date();
      this.formControls.startDate.setValue(this.datePipe.transform(wrkDate, 'yyyy-MM-dd'));
      wrkDate.setDate(wrkDate.getDate() - 1);
      this.formControls.endDate.setValue(this.datePipe.transform(wrkDate, 'yyyy-MM-dd'));
    } else {
      this.formControls.startDate.disable();
      this.formControls.endDate.disable();
      this.formControls.startDate.reset();
      this.formControls.endDate.reset();
    }

  }

  onAddProject() {

    this.validateControls = true;

    if (this.projectForm.invalid) {
      return
    } else {

      // Assign the model from the form values
      this.projectData = this.projectForm.value;
      this.projectData.manager_Id = this.formControls.manager_Id.value;

      this.counterData = new Counter('ProjectId', '', 0);
      this.counterSvc.getNextId(this.counterData).subscribe(
        (res: Counter) => {

          this.projectData.project_Id = res.prefix + res.sequenceVal;

          // Invoke the addUser service method for adding the user details
          this.projectSvc.addProject(this.projectData).subscribe(
            (res: any) => {
              this.projectForm.reset();
              this.validateControls = false;
            }
          );

        })
      // Get the list of Projects after add to repopulate the grid
      this.getProjects();
    }

  }

  onUserSelected(user: User) {
    this.formControls.manager_Id.setValue(user.employee_Id)
  }

}
