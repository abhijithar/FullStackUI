import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  sortOrder = 'firstName';

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
      firstName: [''],
      lastName: [''],
      employee_Id: [''],
      project_Id: [''],
      task_Id: ['']
    });

    // Get the list of Users
    this.getUsers();

  }

  // Component method for adding a new User
  onAddUser() {

    // Assign the model from the form values
    this.userData = this.userForm.value;

    // Invoke the addUser service method for adding the user details
    this.userSvc.addUser(this.userData).subscribe(
      (res: any) => {
        this.userForm.reset();
      }
    );

    // Get the list of Users after add to repopulate the grid
    this.getUsers();

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


 
}
