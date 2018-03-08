import { TestBed, inject } from '@angular/core/testing';

import { AppUtilService } from './app-util.service';
import { WEATHER_RESPONSE } from '../../../assets/weather-response.mock';
import { WeatherModel } from '../interfaces/weather.interface';
import { detectChanges } from '@angular/core/src/render3';
describe('AppUtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppUtilService]
    });
  });

  it('should be created', inject([AppUtilService], (service: AppUtilService) => {
    expect(service).toBeTruthy();
  }));

  // This test will cover complete AppUtilService as all function calls triggering from createDataModel
  it('should be return weather data model', inject([AppUtilService], (service: AppUtilService) => {
    const weatherData: Array<WeatherModel> = service.createDataModel(WEATHER_RESPONSE);
    expect( weatherData.length ).toBeGreaterThan(0);
  }));
});
