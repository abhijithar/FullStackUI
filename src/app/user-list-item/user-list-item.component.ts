import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Models, Services and components used
import { User } from '../core/models/user';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent implements OnInit {

  @Input() userData: User;
  @Output() userSelected = new EventEmitter();
  @Output() reloadUser = new EventEmitter();
  
  constructor(
    private userSvc: UserService
  ) { }

  ngOnInit() {
  }

  onDeleteUser(userData: User, id: string) {

    // Get the list of Users
    this.userSvc.removeUser(id).subscribe(
      (res: User) => {
        this.reloadUser.emit(true);
      }
    );

  }

  onUpdateUser(userData: User) {

    // Get the list of Users
    this.userSelected.emit(userData);

  }

}
