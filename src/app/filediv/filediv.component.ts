import { Input, Component, OnInit } from '@angular/core';

const { ipcRenderer } = window.require('electron');

@Component({
  selector: 'app-filediv',
  templateUrl: './filediv.component.html',
  styleUrls: ['./filediv.component.scss']
})
export class FiledivComponent implements OnInit {

  constructor() {
    ipcRenderer.on('get-base64-img-reply', (event, arg) => {
      if (arg.filename === this.filename) {
        this.content = arg.content;
      }
    });
   }

  @Input() filename: String;
  content: String = null;
  ngOnInit() {
    ipcRenderer.send('get-base64-img', this.filename);
  }


  

}
