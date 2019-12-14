import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Project } from '../core/models/project';

@Component({
  selector: 'app-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.css'],
  providers: [DatePipe]
})
export class ProjectListItemComponent implements OnInit {
  
  @Input() projectData: Project;
  @Output() projectSelected = new EventEmitter();
  @Output() reloadProject = new EventEmitter();

  constructor(
    private datePipe: DatePipe) { }

  ngOnInit() {
  }


  onUpdateUser(userData: Project) {

    // Get the list of Users
    this.projectSelected.emit(userData);

  }

  formatDate(date: Date) {
    
    let wrkDate = new Date(date);
    return(this.datePipe.transform(wrkDate,'yyyy-MM-dd'));
  }

}
