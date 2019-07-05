import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit, OnChanges {

  @Input() pieData;
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
      labels: {
        fontColor: 'black',
        fontSize: 20
      },
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
    maintainAspectRatio: false
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: []
    }
  ];
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    this.pieChartLabels = [];
    this.pieChartData = [];
    this.pieChartColors = [
      {
        backgroundColor: []
      }
    ];
    if (this.pieData) {
      console.log('PieData', this.pieData);
      if (this.pieData.length === 2) {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.pieData[0].length; i++) {
          this.pieChartLabels.push(this.pieData[0][i].value);
          this.pieChartData.push(Number(this.pieData[1][i].value));
        }
        this.colourise(this.pieData[0].length);
        console.log('Labels', this.pieChartLabels);
      } else if (this.pieData[0].length === 1) {
        for (let i = 1; i < this.pieData.length; i++) {
          this.pieChartLabels.push(this.pieData[i][0].id);
          this.pieChartData.push(Number(this.pieData[i][0].value));
        }
        this.colourise(this.pieData.length);
      }
    }
  }

  colourise(num: number) {
    const y = 255 / num;
    const col = [0, 0, 0];
    for (let i = 0; i < num; i++) {
      col[0] = Math.floor((Math.random() * 255) + 0);
      col[1] = Math.floor((Math.random() * 255) + 0);
      col[2] = Math.floor((Math.random() * 255) + 0);
      this.pieChartColors[0].backgroundColor.push('rgb(' + col[0] + ',' + col[1] + ',' + col[2] + ')');
    }
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeLegendPosition() {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }
}
