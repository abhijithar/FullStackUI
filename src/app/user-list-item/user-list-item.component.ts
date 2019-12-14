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
  @Output() userDataProcessed = new EventEmitter();
  
  constructor(
    private userSvc: UserService
  ) { }

  ngOnInit() {
  }

}
