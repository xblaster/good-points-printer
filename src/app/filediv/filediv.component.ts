import { Input, Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
const { ipcRenderer } = window.require('electron');

@Component({
  selector: 'app-filediv',
  templateUrl: './filediv.component.html',
  styleUrls: ['./filediv.component.scss']
})
export class FiledivComponent implements OnInit {

  constructor() {
    this.content = new BehaviorSubject(null);
    ipcRenderer.on('get-base64-img-reply', (event, arg) => {
      if (arg.filename === this.filename) {
        this.content.next(arg.content);
      }
    });
   }

  @Input() filename: String;
  content: BehaviorSubject<String>;
  ngOnInit() {
    ipcRenderer.send('get-base64-img', this.filename);
  }

}
