import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetTasksAsPortableDocFormatPage } from './get-tasks-as-portable-doc-format.page';

const routes: Routes = [
  {
    path: '',
    component: GetTasksAsPortableDocFormatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetTasksAsPortableDocFormatPageRoutingModule {}
