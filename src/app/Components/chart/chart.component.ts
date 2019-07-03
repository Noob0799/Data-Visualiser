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
  pieclicked = false;
  barclicked = false;
  constructor() {
   }

  ngOnInit() {
  }
  ngOnChanges() {
    this.disabledButtons();
    console.log('Chart', this.data);
    if (this.data.length === 2 || this.data[1].length === 1) {
      (document.getElementById('pie') as HTMLInputElement).disabled = false;
      this.pieSort();
    } else {
      (document.getElementById('bar') as HTMLInputElement).disabled = false;
      this.barSort();
    }
  }
  disabledButtons() {
    console.log(document.getElementById('pie'));
    (document.getElementById('pie') as HTMLInputElement).disabled = true;
    (document.getElementById('bar') as HTMLInputElement).disabled = true;
  }
  pie() {
    console.log('Pie Clicked');
    this.pieclicked = true;
    this.barclicked = false;
  }
  bar() {
    console.log('Bar Clicked');
    this.pieclicked = false;
    this.barclicked = true;
  }
  pieSort() {
    this.pieData = this.data;
    this.barclicked = false;
    this.pieclicked = true;
  }
  barSort() {
    this.barData = this.data;
    this.pieclicked = false;
    this.barclicked = true;
  }
}
