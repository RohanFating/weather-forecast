import { TestBed, inject } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import { WeatherModule } from '../weather.module';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions, Response } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { WEATHER_RESPONSE } from '../../../assets/weather-response.mock';

describe('WeatherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WeatherModule],
      providers: [
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([WeatherService], (service: WeatherService) => {
    expect(service).toBeTruthy();
  }));

  it('should call weather api service', inject([WeatherService, XHRBackend], (service: WeatherService, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(WEATHER_RESPONSE)
      })));
      service.getWeatherByCity('London').subscribe((data) => {
        expect(data.list.length).toBeGreaterThan(0);
      },
        (err) => {
          fail('Error in service call');
        });
    });
  }));

  it('should validate error scenario for weather api service', inject([WeatherService, XHRBackend],
    (service: WeatherService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockError(new Error('Error in service call'));
        service.getWeatherByCity('London').subscribe((data) => {
          fail('Error in service call');
        },
          (err) => {
            expect(err).toBeDefined();
          });
      });
    }));
});
