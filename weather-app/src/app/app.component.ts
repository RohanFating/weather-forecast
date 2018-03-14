import { Component } from '@angular/core';
import { LIST_CITIES } from './weather.cities';
import { CityList } from './weather/interfaces/weather.interface';

/**
 * AppComponent - parent component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public countries: Array<CityList> = LIST_CITIES;
  public selectedValue: string = 'London';
}
