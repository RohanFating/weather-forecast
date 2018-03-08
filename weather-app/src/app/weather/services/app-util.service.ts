import { Injectable } from '@angular/core';
import { WeatherCondition, WeatherModel } from '../interfaces/weather.interface';

// Constants require for some formatting of date and temprature
const DAYS: Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS: Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const KELVIN_TO_CELCIOUS_DIFF: number = 273.15;

/**
 * Utility class to create data model for weather data
 */
@Injectable()
export class AppUtilService {

  /**
   * Return data model for weather
   * @param data - data coming from server
   */
  public createDataModel(data: any): Array<WeatherModel> {
    const weatherData: Array<WeatherModel> = [];
    let previousDate: string;
    let dayWeather: Array<WeatherCondition> = [];
    let min: number;
    let max: number;
    let pressure: number;
    let humidity: number;
    data.list.forEach((value, index) => {
      const date = new Date(value.dt_txt);

      if ((previousDate && previousDate !== value.dt_txt.split(' ')[0]) ) {
        weatherData.push( this.getDataModel(dayWeather, min, max, pressure, humidity, previousDate));
        dayWeather = [];
      }
      max = this.getAverageValues('max', value, max);
      min = this.getAverageValues('min', value, min);
      pressure = this.getAverageValues('pressure', value, pressure);
      humidity = this.getAverageValues('humidity', value, humidity);
      dayWeather.push(this.getCompleteDayForeCastTemp(value));
      previousDate = value.dt_txt.split(' ')[0];
    });
    return weatherData;
  }

  /**
   * Return data model of type WeatherModel
   * @param dayWeather -array of item containing temp weather forcast for complete data
   * @param min - calculated min temp
   * @param max - calculated max temp
   * @param pressure - avg calculated pressure
   * @param humidity - avg calculated humidity
   * @param date - date
   */
  private getDataModel(dayWeather: Array<WeatherCondition>, min, max, pressure, humidity, date): WeatherModel {
    return {
      forcast: dayWeather,
      weatherSituation: dayWeather[0].weatherSituation,
      day: this.getFormattedDate(date),
      minTemp: min,
      maxTemp: max,
      avgPressure: pressure,
      avgHumidity: humidity,
    };
  }

  /**
   * Return data model of type WeatherCondition
   * @param data - data got from server
   */
  private getCompleteDayForeCastTemp(data): WeatherCondition {

    return {
      currentTemp: `${this.converKelvinToCelcious(data.main.temp)}`,
      weatherSituation: this.formatWeatherStatus(data.weather[0].description),
      time: this.getTime(data.dt_txt)
    };
  }

  /**
   * Conver temp from kelvin to celcious
   * @param kelvin - temp in kelvin unit
   */
  private converKelvinToCelcious(kelvin): string {
    return `${Number(kelvin - KELVIN_TO_CELCIOUS_DIFF).toFixed(0)}`;
  }

  /**
   * Returns formatted date e.g Monday, 11 Mar
   * @param date - date from server data
   */
  private getFormattedDate(date): string {
    const dateToConvert = new Date(date);
    return `${DAYS[dateToConvert.getDay()]} ${dateToConvert.getDate()} ${MONTHS[dateToConvert.getMonth()]}`;
  }

  /**
   * Returns formatted time
   * @param time - time from server data
   */
  private getTime(time): string {
    const splittedDate: string = time.split(' ')[1];
    return `${splittedDate.substring(0, 5)}`;
  }

  /**
   * Returns formatted date e.g Monday, 11 Mar
   * @param status - date from server data
   */
  private formatWeatherStatus(status): string {
    const splittedStatus: Array<string> = status.split('');
    splittedStatus[0] = splittedStatus[0].toUpperCase();
    return `${splittedStatus.join('')}`;
  }

  /**
   * To return min, max temp ang average values ofpressure and humidity
   * @param name - name of attribute
   * @param data - weather daya
   * @param value - current value
   */
  private getAverageValues(name, data, value): number {
    let newValue: number;
    switch (name) {
      case 'min':
        newValue = value ? Math.max(Number(this.converKelvinToCelcious(data.main.temp_min)), value) :
          Number(this.converKelvinToCelcious(data.main.temp_min));
        break;
      case 'max':
        newValue = value ? Math.max(Number(this.converKelvinToCelcious(data.main.temp_max)), value) :
          Number(this.converKelvinToCelcious(data.main.temp_max));
        break;
      case 'pressure':
        newValue = value ? Number( Number((data.main.pressure + value) / 2).toFixed(0)) : data.main.pressure;
        break;
      case 'humidity':
        newValue = value ? Number(Number ((data.main.humidity + value) / 2).toFixed(0)) : data.main.humidity;
        break;
      default:
        break;
    }
    return newValue;
  }
}
