import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit, OnChanges {

  @Input() barData;
  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
      labels: {
        fontColor: 'black',
        fontSize: 20
      },
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    },
    maintainAspectRatio: false
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [];

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
        this.barChartLabels = [];
        this.barChartData = [];
        const col = [];
        if (this.barData) {
      console.log('Bar', this.barData);
      for (let i = 1; i < this.barData.length; i++) {
        this.barChartLabels.push(this.barData[i][0].id);
      }
      console.log('Label', this.barChartLabels);
      let value = [];
      // tslint:disable-next-line: prefer-for-of
      for ( let i = 0; i < this.barData[0].length; i++) {
        for (let j = 1; j < this.barData.length; j++) {
          value.push(Number(this.barData[j][i].value));
      }
        col[i] = this.getRandomColor();
        console.log(col[i]);
        this.barChartData.push({data: value, label: this.barData[0][i].value, backgroundColor: col[i]});
        value = [];
    }
      console.log('Barchartdata', this.barChartData);
  }
  }
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  // public randomize(): void {
  //   // Only Change 3 values
  //   const data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     (Math.random() * 100),
  //     56,
  //     (Math.random() * 100),
  //     40];
  //   this.barChartData[0].data = data;
  // }
}