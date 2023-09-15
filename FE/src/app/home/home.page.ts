import { Component, inject } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { MessageComponent } from '../message/message.component';

import { DataService, Message } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private data = inject(DataService);
  constructor(private http: HttpClient) { }  
  list : any;
  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  getTasksAsPortableDocFormat() {
    var mediaType = 'application/pdf';
    var url = 'https://localhost:44379/api/Tasks/GetTasksAsPortableDocFormat';  

    this.http.get(url).subscribe(
        (response) => {
          this.list = response;

          var blob =  this.b64toBlob(this.list,  mediaType );
          saveAs(blob, 'Task.pdf');
        },
        e => { throwError(e); }
    );
  }
  public b64toBlob(b64Data: string, contentType: string) {
    contentType = contentType || '';
    let sliceSize = 512;
  
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
  
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
  
        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
  
        var byteArray = new Uint8Array(byteNumbers);
  
        byteArrays.push(byteArray);
    }
  
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}
