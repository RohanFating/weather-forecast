import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherCondition, WeatherModel } from '../../interfaces/weather.interface';
import { AppUtilService } from '../../services/app-util.service';

const HOURS: number = 1000 * 60 * 60;
const ERROR_MESSAGE: string = 'Service Error';

/**
 * WeatherComponent to show five days weather forcast
 */
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html'
})
export class WeatherComponent implements OnInit, OnDestroy, OnChanges {

  @Input() public city: string;

  public weatherData: Array<WeatherModel>;
  public errorMessage: string;
  public isLoading: boolean = false;

  private weatherServiceCallInterval: any;
  private weatherService: WeatherService;
  private appUtilService: AppUtilService;

  /**
   * @constructor
   * @param weatherService - service to get data from server
   * @param appUtilService - utility service to generate data model for weather
   */
  constructor(weatherService: WeatherService, appUtilService: AppUtilService) {
    this.weatherService = weatherService;
    this.appUtilService = appUtilService;
    this.weatherData = [];
    this.city = this.city || 'London';
  }

  /**
   * Lifecyle hook ngOnInit
   */
  public ngOnInit(): void {
    this.getWeather();
    this.weatherServiceCallInterval = setInterval(() => {
      this.getWeather();
    }, HOURS);
  }

  /**
   * Lifecyle hook ngOnChanges
   */
  public ngOnChanges(): void {
    this.getWeather();
  }
  /**
   * Lifecycle Hook for component clean up
   */
  public ngOnDestroy(): void {
    clearInterval(this.weatherServiceCallInterval);
  }

  /**
   * Service call to get weather data
   */
  private getWeather() {
    this.isLoading = true;
    this.weatherData = [];
    this.weatherService.getWeatherByCity(this.city).subscribe((data) => {
      this.isLoading = false;
      this.weatherData = this.appUtilService.createDataModel(data);
      if (this.weatherData.length === 0) {
        this.errorMessage = ERROR_MESSAGE;
      }
    },
      (err) => {
        this.isLoading = false;
        this.errorMessage = ERROR_MESSAGE;
      }
    );
  }
}
