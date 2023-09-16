import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentForecastPageComponent } from './current-forecast.page.component';

const routes: Routes = [
  {
    path: '',
    component: CurrentForecastPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrentForecastRoutingPageModule { }
