import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input() data;
  pieData;
  barData;
  stackData;
  pieclicked = false;
  barClicked = false;
  stackclicked = false;
  constructor() {
   }

  ngOnInit() {
  }
  ngOnChanges() {
    this.disabledButtons();
    console.log('Chart', this.data);
    if (this.data.length === 2 || this.data[1].length === 1) {
      (document.getElementById('pie') as HTMLInputElement).disabled = false;
      (document.getElementById('bar') as HTMLInputElement).disabled = false;
      this.pieSort();
      this.barSort();
    } else {
      (document.getElementById('stack') as HTMLInputElement).disabled = false;
      this.stackSort();
    }
  }
  disabledButtons() {
    console.log(document.getElementById('pie'));
    (document.getElementById('pie') as HTMLInputElement).disabled = true;
    (document.getElementById('bar') as HTMLInputElement).disabled = true;
    (document.getElementById('stack') as HTMLInputElement).disabled = true;
  }
  pie() {
    console.log('Pie Clicked');
    this.pieclicked = true;
    this.barClicked = false;
    this.stackclicked = false;
  }
  bar() {
    console.log('Bar Clicked');
    this.pieclicked = false;
    this.barClicked = true;
    this.stackclicked = false;
  }
  stack() {
    console.log('Stack Clicked');
    this.pieclicked = false;
    this.barClicked = false;
    this.stackclicked = true;
  }
  pieSort() {
    this.pieData = this.data;
  }
  barSort() {
    this.barData = this.data;
  }
  stackSort() {
    this.stackData = this.data;
  }
}
