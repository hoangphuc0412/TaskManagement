import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { gantt } from 'dhtmlx-gantt';
import { DataService } from 'src/app/services/data.service';
import { AssignedList, Item, Task, TaskGantt } from '../../interface';
import { IonModal } from '@ionic/angular';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'gantt',
    styleUrls: ['./gantt.component.scss'],
    templateUrl: './gantt.component.html',
})

export class GanttComponent implements OnInit {
    @ViewChild('gantt_here', { static: true }) ganttContainer!: ElementRef;
    @ViewChild('modal', { static: true }) modal!: IonModal;

    constructor(
        private dataService: DataService,
      ) { }

    public taskGantt: TaskGantt[] = [];
    public state: boolean = false;
    selectedText = '0 Items';
    selected: string[] = [];
    

    items: Item[] = [
        { text: 'Start Date', value: 'startdate' },
        { text: 'Task Name', value: 'text' },
        { text: 'Duration', value: 'duration' },
      ];
    NgAfterViewInit() {
        
    }

    ngOnInit(){
        gantt.init(this.ganttContainer.nativeElement);
        gantt.config.date_format = '%Y-%m-%d %H:%i';
        
        this.dataService.getTaskList().subscribe((taskList : Task[]) => {
        this.taskGantt = taskList.map(element => {
            
            const index = element.StartDate.indexOf('T');
            
            const cutString = element.StartDate.substring(0, index );
            
            const date = new Date(cutString);
            
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const formatted_date = `${day}-${month}-${year}`;

            return { 
                id: element.Id_Task,
                parent: element.Id_Parent,
                start_date: formatted_date,
                text: element.Label,
                progress: element.Progress,
                duration: element.Duration
            } 
            });
            gantt.parse( {tasks: this.taskGantt})
        })

        gantt.attachEvent("onAfterTaskAdd", (id,item) =>{

            id = this.taskGantt[this.taskGantt.length - 1].id + 1;

            var task: Task = {
                                Id_Task: this.taskGantt[this.taskGantt.length - 1].id + 1,
                                Id_Parent: item.parent,
                                Label: item.text,
                                TaskName: item.text,
                                StartDate: this.formatDate(item.start_date),
                                EndDate: this.formatDate(item.start_date),
                                Duration: item.duration,
                                Progress: 0,
                                IsUnscheduled: false
                            };
                            
            this.dataService.confirmTask(task).subscribe(() => {
                return '';
            })

        });
        gantt.attachEvent("onAfterTaskUpdate", (id,item) =>{
            var task: Task = {
                                Id_Task: id,
                                Id_Parent: item.parent,
                                Label: item.text,
                                TaskName: item.text,
                                StartDate: this.formatDate(item.start_date),
                                EndDate: this.formatDate(item.start_date),
                                Duration: item.duration,
                                Progress: 0,
                                IsUnscheduled: false
                            };
            
            this.dataService.editTask(id, task).subscribe(() => {
                return '';
            })
        });

        gantt.attachEvent("onAfterTaskDelete", (id,item) => {

            this.dataService.deleteTask(id).subscribe(() => {
                return '';
            })
        });
        
    }
    
    public formatDate(item: string): string {
        const date = new Date(item);
            
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    }

    public convertDataType(item: any, isEdit: boolean, id: number): any {
        var task: Task = {
            Id_Task: isEdit ? id : this.taskGantt[this.taskGantt.length - 1].id + 1,
            Id_Parent: item.parent,
            Label: item.text,
            TaskName: item.text,
            StartDate: this.formatDate(item.start_date),
            EndDate: this.formatDate(item.start_date),
            Duration: item.duration,
            Progress: 0,
            IsUnscheduled: false
        };
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
    public handleSelectedSearch(query: any){
        var tempo: TaskGantt[] = [];

        if(this.selected.length > 0) {
            for(let i = 0; i < this.selected.length; i++) {
            var filtered: TaskGantt[] = [];

            switch(this.selected[i]){
            case "startdate":
                filtered = this.taskGantt.filter((d) => d.start_date.toLowerCase().indexOf(query) > -1);
                break;
            case "text":
                filtered = this.taskGantt.filter((d) => d.text.toLowerCase().indexOf(query) > -1);
                break;
            case "duration":
                filtered = this.taskGantt.filter((d) => d.duration.toString().indexOf(query) > -1);
                break;
            // default:
            //   console.log("Invalid day");
            }
            tempo = tempo.concat(filtered);
            // filtered?.concat().filter(d => !array.includes(element))
            }
        }
        console.log(tempo);
        return tempo;
        
    }

    handleInput(event: any) {
        const query: string = event.target.value.toLowerCase();
        
        if(query.length > 0) { 
    
          this.taskGantt = this.handleSelectedSearch(query);
          console.log(this.taskGantt);

          gantt.clearAll()
          gantt.parse( {tasks: this.taskGantt})
          gantt.render();

        } else {
            this.dataService.getTaskList().subscribe((taskList : Task[]) => {
                this.taskGantt = taskList.map(element => {
                    
                    const index = element.StartDate.indexOf('T');
                    
                    const cutString = element.StartDate.substring(0, index );
                    
                    const date = new Date(cutString);
                    
                    const day = date.getDate();
                    const month = date.getMonth() + 1;
                    const year = date.getFullYear();
                    const formatted_date = `${day}-${month}-${year}`;
        
                    return { 
                        id: element.Id_Task,
                        parent: element.Id_Parent,
                        start_date: formatted_date,
                        text: element.Label,
                        progress: element.Progress,
                        duration: element.Duration
                    } 
                    });
                    console.log(this.taskGantt);
                    gantt.parse( {tasks: this.taskGantt})
                    
                })
        }
    }


    
}