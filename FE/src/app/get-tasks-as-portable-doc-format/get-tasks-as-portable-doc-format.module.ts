import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetTasksAsPortableDocFormatPageRoutingModule } from './get-tasks-as-portable-doc-format-routing.module';

import { GetTasksAsPortableDocFormatPage } from './get-tasks-as-portable-doc-format.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetTasksAsPortableDocFormatPageRoutingModule
  ],
  declarations: [GetTasksAsPortableDocFormatPage]
})
export class GetTasksAsPortableDocFormatPageModule {}
