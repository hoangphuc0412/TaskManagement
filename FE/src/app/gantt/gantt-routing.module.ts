import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GanttPage } from './gantt.page';

const routes: Routes = [
  {
    path: '',
    component: GanttPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GanttPageRoutingModule {}
