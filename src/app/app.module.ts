import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserListItemComponent } from './user-list-item/user-list-item.component';
import { SortUserPipe } from './core/pipes/sort-user.pipe';
import { FilterUserPipe } from './core/pipes/filter-user.pipe';
import { ProjectComponent } from './project/project.component';
import { ProjectListItemComponent } from './project-list-item/project-list-item.component';
import { SortProjectPipe } from './core/pipes/sort-project.pipe';
import { FilterProjectPipe } from './core/pipes/filter-project.pipe';
import { DisableControlDirective } from './core/directives/disable-control.directive';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserListItemComponent,
    SortUserPipe,
    FilterUserPipe,
    ProjectComponent,
    ProjectListItemComponent,
    SortProjectPipe,
    FilterProjectPipe,
    DisableControlDirective,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
