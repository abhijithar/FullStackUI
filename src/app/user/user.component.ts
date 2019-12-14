import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Models & Services imported in the module
import { UserService } from '../core/services/user.service';
import { User } from '../core/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  // Component variables
  userForm: FormGroup;
  userData: User;
  userList: User[];
  sortOrder: string = 'firstName';
  validateControls: boolean = false;
  updateBtn: boolean = false;

  // Inject the necessary services
  constructor(
    private userSvc: UserService,
    private formBuilder: FormBuilder
  ) { }

  // Init method for all initializations
  ngOnInit() {

    // Define the from group for user
    this.userForm = this.formBuilder.group({
      user_Id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      employee_Id: ['', Validators.required],
      project_Id: [''],
      task_Id: ['']
    });

    // Get the list of Users
    this.getUsers();

  }

  // convenience getter for easy access to form fields
  get formControls() { return this.userForm.controls; }

  // Component method for adding a new User
  onAddUser() {

    this.validateControls = true;

    if (this.userForm.invalid) {
      console.log("Error");
      return
    } else {

      // Assign the model from the form values
      this.userData = this.userForm.value;

      // Invoke the addUser service method for adding the user details
      this.userSvc.addUser(this.userData).subscribe(
        (res: any) => {
          this.userForm.reset();
          this.validateControls = false;
        }
      );

      // Get the list of Users after add to repopulate the grid
      this.getUsers();
    }

  }


  // Component method for adding a new User
  onReset() {

    this.validateControls = false;
    this.userForm.reset();

  }

  getUsers() {

    // Get the list of Users
    this.userSvc.getUser().subscribe(
      (res: User[]) => {
        this.userList = res;
      }
    );

  }

  onSortByFname() {
    this.sortOrder = 'firstName';
  }

  onSortByLname() {
    this.sortOrder = 'lastName';
  }

  onSortById() {
    this.sortOrder = 'employee_Id';
  }


  onUserSelected(userData: User) {

    if (userData !== null) {

      this.userForm.patchValue({
        employee_Id: userData.employee_Id,
        firstName: userData.firstName,
        lastName: userData.lastName
      });
      this.updateBtn = true;

    }

  }

}
