import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent implements OnInit {

  tableHeader: string[];
  tableData: any[];
  @Output() dataemitter = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  fileUpload(event: any) {
    // const file = document.getElementById('file');
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.readAsText(file);
    reader.onload = (e) => {
      const data = e.target.result;
      this.createTable(data);
    };
  }

  createTable(data: any) {
    if (data) {
      this.tableData = [];
      this.tableHeader = [];
      let flag = 0;
      let tempRow = '';
// tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < data.length; i++) {
        if (data[i] !== '\n') {
          tempRow += data[i];
        } else {
          flag ++;
          const row = tempRow.split(',');
          if ( flag === 1) {
            this.tableHeader = row;
          } else {
            this.tableData.push(row);
          }
          tempRow = '';
          continue;
        }
      }
    }
  }

  getData($event) {
    console.log($event);
    this.dataemitter.emit($event);
  }
}
