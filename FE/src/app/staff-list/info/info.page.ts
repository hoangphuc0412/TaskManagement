import { Component, Input, OnChanges, OnInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Staff } from 'src/app/interface';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  @Input() id: number | undefined;

  constructor( 
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
  ) { }

  errorMessage: string = '';
  FullName : string = '';
  successMessage: string = '';
  ShortName : string = '';
  addValue : string = '';
  Id_Staff: any = '';
  isPopoverOpen: boolean = false;
  
  validation_messages : string = '';

  ngOnInit() {
    
    this.route.queryParams.subscribe((params: Params) => {
      this.Id_Staff = params['id'];
      console.log(this.Id_Staff);
      
      this.cd.detectChanges();
      if(this.Id_Staff > 0) {
          this.dataService.getStaffById(this.Id_Staff)
          .subscribe(data => {this.FullName = data.FullName; this.ShortName = data.ShortName})
        this.cd.detectChanges();

        }
    }); 
    
  }

  tryRegister(value: any) {
    // this.dataService.doRegister(value)
    //  .then((res: any) => {
    //    console.log(res);
    //    this.errorMessage = "";
    //    this.successMessage = "Your account has been created. Please log in.";
    //  }, (err: { message: string; }) => {
    //    console.log(err);
    //    this.errorMessage = err.message;
    //    this.successMessage = "";
    //  })
  }

  confirm() {
    this.isPopoverOpen = false;

    var staff : Staff = {
                  Id_Staff: this.Id_Staff,
                  FullName: this.FullName,
                  ShortName: this.Id_Staff == 0 ? this.addValue : this.ShortName
                }
                
                console.log(staff);
    if(this.FullName.length > 0 && this.addValue.length > 0 ) {
      if(this.Id_Staff == 0) {
        
        this.dataService.confirmStaff(staff).subscribe(x => {
          // console.log(x);
          // if(x) {
            this.validation_messages  = 'Success';
            this.isPopoverOpen = true;
          // }
        });
      } else {
        this.dataService.editStaff(this.Id_Staff, staff).subscribe(x => {
          // console.log(x);
          this.validation_messages  = 'Success';
          this.isPopoverOpen = true;
        })
      }
    } else {
      this.validation_messages  = 'Please fill empty field(s)';
      this.isPopoverOpen = true;
    }        
    
    
    
  }



}
