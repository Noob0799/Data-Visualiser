import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {Cell} from '../cell';
import { Xliff2 } from '@angular/compiler';

@Component({
  selector: 'app-table-builder',
  templateUrl: './table-builder.component.html',
  styleUrls: ['./table-builder.component.scss']
})
export class TableBuilderComponent implements  OnChanges {

  @Input() data;
  @Input() head;
  @Output() dataemitter = new EventEmitter();
  tableData: any[] = [];
  tableHeader: Cell[] = [];
  lastClickHead;
  lastClickData;
  emitData: any[] = [];
  secondLastClickData;
  numberOfClick;
  constructor() {
    this.lastClickHead = new Cell();
    this.lastClickData = new Cell();
    this.secondLastClickData = new Cell();
    this.numberOfClick = 0;
   }
  ngOnChanges() {
    console.log('header', this.head);
    console.log('data', this.data);
    this.numberOfClick = 0;
    if (this.head) {
// tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.head.length; i++) {
        this.tableHeader[i] = new Cell();
        this.tableHeader[i].value = this.head[i];
        this.tableHeader[i].header = true;
        this.tableHeader[i].clicked = false;
        this.tableHeader[i].x = 0;
        this.tableHeader[i].y = i;
      }
    }
    if (this.data) {
// tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.data.length; i++) {
// tslint:disable-next-line: prefer-for-of
        const row = [];
        for (let j = 0; j < this.data[i].length; j++) {
          const cell = new Cell();
          cell.x = Number(this.data[i][0]);
          cell.y = j;
          cell.header = false;
          cell.clicked = false;
          cell.value = this.data[i][j];
          row.push(cell);
      }
        this.tableData.push(row);
    }
  }
}

  handleClickData(event, info, i, j) {
    for (let i = 0; i < this.tableHeader.length; i++) {
      this.tableHeader[i].clicked = false;
      this.onClickHead(this.tableHeader[i]);
    }
    if (info.y === 0) {
      return;
    }
    if ( this.numberOfClick === 0) {
      this.tableData[info.x - 1][info.y].clicked = !this.tableData[info.x - 1][info.y].clicked;
      this.onClickData(this.tableData[info.x - 1][info.y]);
      this.lastClickData = this.tableData[info.x - 1][info.y];
    }
    if (this.numberOfClick === 1) {
      this.tableData[info.x - 1][info.y].clicked = !this.tableData[info.x - 1][info.y].clicked;
      this.onClickData(this.tableData[info.x - 1][info.y]);
      this.secondLastClickData = this.lastClickData;
      this.lastClickData = this.tableData[info.x - 1][info.y];
      this.selectData(this.lastClickData, this.secondLastClickData);
    }
    if (this.numberOfClick >= 2 && this.lastClickData !== this.tableData[info.x - 1][info.y]) {
      this.secondLastClickData.clicked = !this.secondLastClickData.clicked;
      this.onClickData(this.secondLastClickData);
      this.tableData[info.x - 1][info.y].clicked = !this.tableData[info.x - 1][info.y].clicked;
      this.onClickData(this.tableData[info.x - 1][info.y]);
      this.secondLastClickData = this.lastClickData;
      this.lastClickData = this.tableData[info.x - 1][info.y];
      this.selectData(this.lastClickData, this.secondLastClickData);
    } else if (this.numberOfClick >= 2 && this.lastClickData === this.tableData[info.x - 1][info.y]) {
      this.tableData[info.x - 1][info.y].clicked = !this.tableData[info.x - 1][info.y].clicked;
      this.onClickData(this.tableData[info.x - 1][info.y]);
    }
    this.numberOfClick++;
    // console.log('SecondLast', this.secondLastClickData);
    // console.log('Last', this.lastClickData);
    // console.log('Present', info);
  }

  onClickData(cell: Cell) {
    const x = cell.x - 1;
    // console.log('Inside', cell);
    const cellRef = document.getElementById('cell-' + x + '-' + cell.y);
    if (cell.clicked && cell.y !== 0) {
      cellRef.style.backgroundColor = 'black';
      cellRef.style.color = 'white';
    } else if (cell.clicked && cell.y === 0) {
      cellRef.style.backgroundColor = 'white';
      cellRef.style.color = 'black';
    } else {
      if (cell.x % 2 === 0) {
        cellRef.style.backgroundColor = 'lawngreen';
      } else {
        cellRef.style.backgroundColor = 'gold';
      }
      cellRef.style.color = 'black';
    }
  }
  selectData(first: Cell, second: Cell) {
    console.log('SecondLast', second);
    console.log('Last', first);
    this.emitData = [];
    let row = [];
    let x1;
    let x2;
    let y1;
    let y2;
    if (first.x >= second.x) {
       x1 = second.x;
       x2 = first.x;
    } else {
       x1 = first.x;
       x2 = second.x;
    }
    if (first.y >= second.y) {
       y1 = second.y;
       y2 = first.y;
    } else {
       y1 = first.y;
       y2 = second.y;
    }
// tslint:disable-next-line: prefer-for-of
    for ( let i = 0; i < this.tableData.length; i++ ) {
// tslint:disable-next-line: prefer-for-of
      for ( let j = 0; j < this.tableData[i].length; j++) {
        this.tableData[i][j].id = this.tableHeader[0].value + ' ' +  this.tableData[i][j].x;
        this.tableData[i][j].clicked = false;
        this.onClickData(this.tableData[i][j]);
      }
    }
    for (let j = y1; j <= y2; j++) {
      row.push(this.tableHeader[j]);
    }
    this.emitData.push(row);
    row = [];
    console.log(x1 - 1, x2);
    for (let i = x1 - 1; i < x2; i++) {
      this.tableData[i][0].clicked = true;
      this.onClickData(this.tableData[i][0]);
    }
    for (let i = x1 - 1; i < x2; i++) {
      for (let j = y1; j <= y2; j++) {
        this.tableData[i][j].clicked = true;
        row.push(this.tableData[i][j]);
        this.onClickData(this.tableData[i][j]);
      }
      this.emitData.push(row);
      row = [];
    }
    console.log(this.emitData);
    this.dataemitter.emit(this.emitData);
  }
  handleClickHeader(event, info, i) {
    console.log(info, i);
    if (info.x === 0 && info.y === 0 ) {
      return;
    }
    this.tableHeader[info.y].clicked = !this.tableHeader[info.y].clicked;
    this.lastClickHead.clicked = false;
    this.onClickHead(this.lastClickHead);
    this.lastClickHead = this.tableHeader[info.y];
    this.onClickHead(this.tableHeader[info.y]);
  }
  onClickHead(cell: Cell) {
    const cellRef = document.getElementById('cell-' + cell.y);
    if (cell.clicked) {
      cellRef.style.backgroundColor = 'blue';
      const first = this.tableData[0][cell.y];
      const second = this.tableData[this.tableData.length - 1][cell.y];
      this.selectData(first, second);
    } else {
      cellRef.style.backgroundColor = 'black';
      cellRef.style.color = 'white';
      for (let i = 0; i < this.tableData.length; i++) {
        const dataRef = document.getElementById('cell-' + i + '-' + cell.y);
        const dataHead = document.getElementById('cell-' + i + '-' + 0);
        if (this.tableData[i][cell.y].x % 2 === 0) {
          dataRef.style.backgroundColor = 'lawngreen';
          dataHead.style.backgroundColor = 'lawngreen';
        } else {
          dataRef.style.backgroundColor = 'gold';
          dataHead.style.backgroundColor = 'gold';
        }
        dataRef.style.color = 'black';
        dataHead.style.color = 'black';
      }
    }
  }
}
