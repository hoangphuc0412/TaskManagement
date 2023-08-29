import { Component, OnInit } from '@angular/core';
import { AssignedList, Staff, StaffInTasks, Task } from '../interface';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.page.html',
  styleUrls: ['./gantt.page.scss'],
})
export class GanttPage implements OnInit {

  constructor( private dataService: DataService,
    ) { }

  public assignedList: AssignedList[] = [];
  public staffList: Staff[] = [];
  public taskList: Task[] = [];

  ngOnInit() {
    // this.dataService.getStaffList().subscribe(data => {
    //   this.staffList = data;
    // });
    // this.dataService.getTaskList().subscribe(data => {
    //   this.taskList = data;
    // });
    // this.dataService.getAssignedList().subscribe(assignedList => {
    //   this.assignedList = assignedList;
    // });

    // for (let i = 0; i < this.assignedList.length; i++) {

    //   this.assignedList[i].FullName = this.staffList.find(a => a.Id_Staff === this.assignedList[i].Id_Staff)?.FullName
    //   this.assignedList[i].TaskName = this.taskList.find(a => a.Id_Task === this.assignedList[i].Id_Task)?.TaskName
    //   // StaffInTasks.push({
    //   //   Id_Assign: this.assignedList[i].Id_Assign,
    //   //   TaskName: this.taskList.find(x => x.Id_Task === this.assignedList[i].Id_Task)?.TaskName,
    //   //   FullName: this.staffList.find(x => x.Id_Staff === this.assignedList[i].Id_Staff).FullName
    //   // });
    // }
    // console.log(this.assignedList);
    
  }
  // public getAssignedList(): AssignedList[] {
  //   const StaffInTasks: AssignedList[] = [];; 
  //   for (let i = 0; i < this.assignedList.length; i++) {

  //     this.assignedList[i].FullName = this.staffList.find(a => a.Id_Staff === this.assignedList[i].Id_Staff)?.FullName
  //     this.assignedList[i].TaskName = this.taskList.find(a => a.Id_Task === this.assignedList[i].Id_Task)?.TaskName
  //     // StaffInTasks.push({
  //     //   Id_Assign: this.assignedList[i].Id_Assign,
  //     //   TaskName: this.taskList.find(x => x.Id_Task === this.assignedList[i].Id_Task)?.TaskName,
  //     //   FullName: this.staffList.find(x => x.Id_Staff === this.assignedList[i].Id_Staff).FullName
  //     // });
  //   }
  //   // console.log(this.assignedList);
    
  //   return this.assignedList
  // }
}
