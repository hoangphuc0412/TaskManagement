import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { map } from 'rxjs/operators'; 
import { AssignedList, Staff, Task } from '../interface';

export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'https://localhost:44379/api/';  

  public messages: Message[] = [
    {
      fromName: 'Matt Chorsey',
      subject: 'New event: Trip to Vegas',
      date: '9:32 AM',
      id: 0,
      read: false
    },
    {
      fromName: 'Lauren Ruthford',
      subject: 'Long time no chat',
      date: '6:12 AM',
      id: 1,
      read: false
    },
    {
      fromName: 'Jordan Firth',
      subject: 'Report Results',
      date: '4:55 AM',
      id: 2,
      read: false
    },
  ];

  constructor(private http: HttpClient) { }  

  public getMessages(): Message[] {
    return this.messages;
  }

  public getMessageById(id: number): Message {
    return this.messages[id];
  }

  public getStaffList(): Observable<any> {  
    return this.http.get(this.url + 'Staffs' ).pipe(      
      map(results => results)  
    );  
  }

  public getStaffById(Id_Staff: number): Observable<any> {  
    return this.http.get(this.url + 'Staffs/'+ Id_Staff).pipe(      
      map(results => results)  
    );  
  }  

  public confirmStaff(data: Staff ): Observable<Staff> {      
    return this.http.post<Staff>(this.url + 'Staffs', data);
  }  
  public editStaff( id:number, data: Staff )  {      
      return this.http.put(this.url + `Staffs/${id}`, data);
  }  
  public deleteStaff( id:number)  {      
      return this.http.delete(this.url + `Staffs/${id}`);
  }

  public getTaskList(): Observable<any> {  
    return this.http.get(this.url + 'Tasks').pipe(      
      map(results => results)  
    );  
  }

  public confirmTask(data: Task ): Observable<Task> {  
    
    return this.http.post<Task>(this.url + 'Tasks', data);
    
  }  
  public editTask( id:number, data: Task )  {  
    
      return this.http.put(this.url + `Tasks/${id}`, data);
  }  

  public deleteTask( id:number)  {  
      return this.http.delete(this.url + `Tasks/${id}`);
  }

  public getAssignedList(): Observable<any> {  
    return this.http.get(this.url + `StaffInTasks/GetAssignedList`).pipe(      
      map(results => results)  
    );  
  }

  public getStaffListBySearch(query: string): Observable<any> {  
    return this.http.get(this.url + 'Staffs/'+ query).pipe(      
      map(results => results)  
    );  
  }

  public deleteStaffs(ids: number[]): Observable<Staff[]> {
    return this.http.post<Staff[]>(`${this.url}/Staffs/DeleteStaffs`, ids);
  }

  public addAssignedList(data: AssignedList ): Observable<AssignedList> {  
    
    return this.http.post<AssignedList>(this.url + 'StaffInTasks', data);
  }  

  public getTasksAsPortableDocFormat(): Observable<Blob> {  
    
    return this.http.get<Blob>(this.url + 'Tasks/GetTasksAsPortableDocFormat');
  }  
}
