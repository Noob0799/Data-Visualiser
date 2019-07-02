import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input() data;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    console.log('Chart', this.data);
  }

}
