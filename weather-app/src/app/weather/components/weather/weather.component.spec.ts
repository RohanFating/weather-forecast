import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherComponent } from './weather.component';
import { WeatherModule } from '../../weather.module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { WEATHER_RESPONSE } from '../../../../assets/weather-response.mock';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ WeatherModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should get weather data and generate weather data model', () => {
    //  To test private functions
    const weatherComponent: any = component;
    spyOn(weatherComponent.weatherService , 'getWeatherByCity').and.returnValue(Observable.of(WEATHER_RESPONSE));
    weatherComponent.getWeather();
    fixture.detectChanges();
    expect(component.weatherData).toBeDefined();
  });
});
