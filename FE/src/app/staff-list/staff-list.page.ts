import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Staff } from '../interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.page.html',
  styleUrls: ['./staff-list.page.scss'],
})
export class StaffListPage implements OnInit {

  constructor(
      private dataService: DataService,
      private router: Router,
      private cd: ChangeDetectorRef,
    ) { }

  public staffList: Staff[] = [];
  ngOnChanges(changes: SimpleChanges): void {

  }
  onPageWillEnter(){

    this.dataService.getStaffList().subscribe(data => {
        this.staffList = data;
        console.log(this.staffList);
      })
      this.cd.detectChanges();
  }
  ngOnInit() {
    // this.staffList = 
    this.dataService.getStaffList().subscribe(data => {
      this.staffList = data;
      console.log(this.staffList);
    })
    this.cd.detectChanges();
  }

  public goInfoPage(id: any): void {
    // const navigationExtras = {
    //   id: '123456'
    // };
    console.log(id);
    
    this.router.navigate(['staff-list/info'], { queryParams: {id: id}});
  }
  // public goInfoPage() {
  //   const navigationExtras = {
  //     id: '123456'
  //   };

  //   this.router.navigate(['staff-list/info'], { queryParams: {id: 1}});
  // }

}
