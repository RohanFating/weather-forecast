import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './components/weather/weather.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    WeatherComponent
  ],
  declarations: [WeatherComponent]
})
export class WeatherModule { }
