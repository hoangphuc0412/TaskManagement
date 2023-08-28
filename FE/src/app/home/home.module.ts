import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { MessageComponentModule } from '../message/message.module';
import { TaskListPageModule } from '../task-list/task-list.module';
import { StaffListPageModule } from '../staff-list/staff-list.module';
import {  ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageComponentModule,
    HomePageRoutingModule,
    TaskListPageModule,
    StaffListPageModule,  ReactiveFormsModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
