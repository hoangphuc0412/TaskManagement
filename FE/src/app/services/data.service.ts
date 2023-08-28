import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { map } from 'rxjs/operators'; 
import { Staff } from '../interface';

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
  url = 'https://localhost:44333/api/';  

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
    return this.http.get(this.url + 'staffs').pipe(      
      map(results => results)  
    );  
  }

  public getStaffById(Id_Staff: number): Observable<any> {  
    return this.http.get(this.url + 'staffs/'+ Id_Staff).pipe(      
      map(results => results)  
    );  
  }  

  public confirmStaff(data: Staff ): Observable<Staff> {  
    // console.log(data);
    
    return this.http.post<Staff>(this.url + 'Staffs', data);
  }  
}
