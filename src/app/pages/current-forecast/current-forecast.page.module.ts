import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentForecastPageComponent } from './current-forecast.page.component';
import { SharedModule } from '../../shared/shared.module';
import { CurrentForecastRoutingPageModule } from './current-forecast-routing.page.module';

@NgModule({
  declarations: [
    CurrentForecastPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CurrentForecastRoutingPageModule
  ]
})
export class CurrentForecastPageModule { }
