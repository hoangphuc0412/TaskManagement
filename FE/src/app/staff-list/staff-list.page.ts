import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { ChangeDetectorRef } from '@angular/core';
import { Staff, Item } from '../interface';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.page.html',
  styleUrls: ['./staff-list.page.scss'],
})
export class StaffListPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: IonModal;
  
  constructor(
      private dataService: DataService,
      private router: Router,
      private cd: ChangeDetectorRef,
    ) { }

  public staffList: Staff[] = [];
  public temp: Staff[] = [];
  selectedText = '0 Items';
  selected: string[] = [];

  items: Item[] = [
    { text: 'Full Name', value: 'FullName' },
    { text: 'Short Name', value: 'ShortName' },
  ];

  ngOnInit() {
    // this.staffList = 
    this.dataService.getStaffList().subscribe(data => {
      this.staffList = data;
    })
    this.cd.detectChanges();
  }

  public goInfoPage(id: any): void {
    this.router.navigate(['staff-list/info'], { queryParams: {id: id}});
  }

  handleInput(event: any) {
    const query: string = event.target.value.toLowerCase();
    
    if(query.length > 0) { 

      this.staffList = this.handleSelectedSearch(query);
      // this.staffList = this.staffList.filter((d) => d.FullName.toLowerCase().indexOf(query) > -1);
    } else {
      this.dataService.getStaffList().subscribe(data => {
        this.staffList = data;
      })
    }
  }

  public handleSelectedSearch(query: any){
    var tempo: Staff[] = [];

    if(this.selected.length > 0) {
      for(let i = 0; i < this.selected.length; i++) {
        var filtered: Staff[] = [];

        switch(this.selected[i]){
        case "FullName":
          filtered = this.staffList.filter((d) => d.FullName.toLowerCase().indexOf(query) > -1);
          break;
        case "ShortName":
          filtered = this.staffList.filter((d) => d.ShortName.toLowerCase().indexOf(query) > -1);
          break;
        // default:
        //   console.log("Invalid day");
        }
        tempo = tempo.concat(filtered);
        // filtered?.concat().filter(d => !array.includes(element))
      }
    }
    return tempo;
  }

  public delItem(id: number): void {
    this.dataService.deleteStaff(id).subscribe(() => {
      this.staffList = this.staffList.filter((d) => d.Id_Staff!== id);
    })
  }
  private formatData(data: string[]) {
    if (data.length === 1) {
      const item = this.items.find((item) => item.value === data[0]);
      return item ? item.text : '';
    }

    return `${data.length} items`;
  }

  SelectionChanged(item: string[]) {
    this.selected = item;
    this.selectedText = this.formatData(this.selected);
    this.modal.dismiss();
  }
  
}
