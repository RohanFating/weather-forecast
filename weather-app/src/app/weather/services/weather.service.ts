import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { ApiConfig } from './weather.config';

@Injectable()
export class WeatherService {

  private http: HttpClient;
  /**
   * Construction function
   * @param http - http client
   */
  constructor( http: HttpClient ) {
    this.http = http;
   }

  /**
   * To get weather for city
   * @param city - name of city
   */
  public getWeatherByCity( city: string ): Observable<any> {

  return this.http.get( `${ApiConfig.BASE_URL}q=${city}&APPID=${ApiConfig.API_KEY}` );
  }

}
