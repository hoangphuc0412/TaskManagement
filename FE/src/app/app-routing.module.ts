import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'message/:id',
    loadChildren: () => import('./view-message/view-message.module').then( m => m.ViewMessagePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'staff-list',
    loadChildren: () => import('./staff-list/staff-list.module').then( m => m.StaffListPageModule)
  },
  {
    path: 'task-list',
    loadChildren: () => import('./task-list/task-list.module').then( m => m.TaskListPageModule)
  },
  {
    path: 'ganttt',
    loadChildren: () => import('./ganttt/gantt.module').then( m => m.GanttPageModule)
  },
  {
    path: 'get-tasks-as-portable-doc-format',
    loadChildren: () => import('./get-tasks-as-portable-doc-format/get-tasks-as-portable-doc-format.module').then( m => m.GetTasksAsPortableDocFormatPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
