import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ForecastService } from '../../services/forecast.service'


@Component({
  selector: 'app-full-forecast',
  templateUrl: './full-forecast.component.html',
  styleUrls: ['./full-forecast.component.scss'],
})
export class FullForecastComponent implements OnInit {
  @Input() zipCode: number = 0
  @Input() countryCode: string = 'MX'

  constructor(
    public forecastService: ForecastService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) => {
      this.forecastService.loadFiveForecastInfo(params['zipCode'], params['countryCode'])
    })
  }

  public returnHomePage(): void {
    this.forecastService.fiveDaysForecastInfos$.next([])
    this.router.navigateByUrl('/')
  }
}
