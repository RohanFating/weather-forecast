import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './components/weather/weather.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './services/weather.service';
import { AppUtilService } from './services/app-util.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    WeatherComponent
  ],
  providers: [ WeatherService, AppUtilService ],
  declarations: [WeatherComponent]
})
export class WeatherModule { }
