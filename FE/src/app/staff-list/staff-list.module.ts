import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffListPageRoutingModule } from './staff-list-routing.module';

import { StaffListPage } from './staff-list.page';
import {HeaderModule} from '../header/header.module';
import {TypeaheadModule} from '../typeahead/typeahead.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffListPageRoutingModule,
    HeaderModule,
    TypeaheadModule
  ],
  declarations: [StaffListPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StaffListPageModule {}
