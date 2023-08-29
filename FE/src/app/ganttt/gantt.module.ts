import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GanttPageRoutingModule } from './gantt-routing.module';

import { GanttPage } from './gantt.page';
import {HeaderModule} from '../header/header.module';
import {GanttComponent} from './gantt/gantt.component';
import {TypeaheadModule} from '../typeahead/typeahead.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GanttPageRoutingModule,
    HeaderModule,
    TypeaheadModule
  ],
  declarations: [GanttPage, GanttComponent],
  exports: [
    GanttComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GanttPageModule {}
