export interface WeatherCondition {
    currentTemp: string;
    weatherSituation: string;
    time: string;
}

export interface WeatherModel {
    forcast:  Array<WeatherCondition>;
    day:  string;
    weatherSituation: string;
    minTemp: number;
    maxTemp: number;
    avgPressure: number;
    avgHumidity: number;
}

export interface CityList {
    name: string;
}
