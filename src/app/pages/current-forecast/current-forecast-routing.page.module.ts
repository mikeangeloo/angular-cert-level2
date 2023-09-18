import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentForecastPageComponent } from './current-forecast.page.component';
import { FullForecastComponent } from '../../shared/full-forecast/full-forecast.component';


const routes: Routes = [
  {
    path: '',
    component: CurrentForecastPageComponent
  },
  {
    path: 'forecast',
    component: FullForecastComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrentForecastRoutingPageModule { }
