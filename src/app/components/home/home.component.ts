// const fs = require('fs');
// const remoteElec = require('electron').remote;
// const electroFs = remoteElec.require('fs');
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
const { ipcRenderer } = window.require('electron');

import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {
    this.files = new BehaviorSubject([]);
   }

  public files: BehaviorSubject<any[]>;

  ngOnInit() {
    ipcRenderer.on('list-dir-reply', (event, arg) => {
      console.log(arg);
      this.files.next(arg);
    });
  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }

  onChange(files) {
    // console.log('on change !');
    // console.log(files[0].path);

    const path = files[0].path;
    ipcRenderer.send('list-dir', path);

    /*const myNotification = new Notification('Title', {
      body: 'Lorem Ipsum Dolor Sit Amet'
    });*/
  }

  getPDF() {
    /*console.log(jsPDF);
    const doc = new jsPDF();
    doc.fromHTML(document.getElementById('images'), 0, 0, {
      'width': 1400, // max width of content on PDF
    }, function(bla) {   doc.save('saveInCallback.pdf');
   }, 12);*/
   window.print();
    // doc.save('a4.pdf');
  }
}
