import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'data-visual';
  chartData: any[];
  getData($event) {
    console.log($event);
    this.chartData = $event;
  }
}
