import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GanttPageRoutingModule } from './gantt-routing.module';

import { GanttPage } from './gantt.page';
import {HeaderModule} from '../header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GanttPageRoutingModule,
    HeaderModule
  ],
  declarations: [GanttPage]
})
export class GanttPageModule {}
