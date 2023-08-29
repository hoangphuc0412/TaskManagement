import { Time } from "@angular/common";

export interface Staff {
    Id_Staff: number;
    FullName: string;
    ShortName: string;
  }
export interface Item {
  text: string;
  value: string;
}
export interface Task {
  Id_Task: number;
  TaskName: string;
  Id_Parent: number;
  Label: string;
  StartDate: string;
  EndDate: string;
  Duration: number;
  Progress: number;
  IsUnscheduled: boolean;
}
export class TaskGantt {
  id!: number;
  start_date!: string;
  text!: string;
  progress!: number;
  duration!: number;
  parent!: number;
}
export class AssignedList {
  Id_Assign!: number;
  Id_Staff!: number;
  Id_Task!: number;
  // TaskName!: string;
  // FullName!: string;
}
export class StaffInTasks {
  Id_Assign!: number;
  TaskName!: string;
  FullName!: string;
}