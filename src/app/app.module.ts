import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { UploadButtonComponent } from './Components/upload-button/upload-button.component';
import { TableBuilderComponent } from './Components/table-builder/table-builder.component';
import {Cell} from '../app/Components/cell';
import { ChartComponent } from './Components/chart/chart.component';
import { PieComponent } from './Components/Charts/pie/pie.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UploadButtonComponent,
    TableBuilderComponent,
    ChartComponent,
    PieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [Cell],
  bootstrap: [AppComponent]
})
export class AppModule { }
