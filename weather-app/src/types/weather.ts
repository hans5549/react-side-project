// 天氣圖標類型
export type WeatherIconType = 'sunny' | 'cloud' | 'rain' | 'thunderstorm';

// 小時預報數據結構
export interface HourlyForecast {
  time: string;
  temp: number;
  icon: WeatherIconType;
}

// 每日預報數據結構
export interface DailyForecast {
  day: string;
  temp: number;
  icon: WeatherIconType;
  precip: number;
  desc: string;
  wind: number;
  humidity: number;
}

// 城市天氣數據結構
export interface CityWeather {
  currentTemp: number;
  weatherDesc: string;
  realFeel: number;
  windSpeed: number;
  clouds: number;
  humidity: number;
  icon: WeatherIconType;
  hourly: HourlyForecast[];
  weekly: DailyForecast[];
}

// API響應相關類型
export interface WeatherItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    icon: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  pop?: number; // 降水概率
  clouds?: {
    all: number;
  };
}

export interface CityCoord {
  lat: number;
  lon: number;
}

export type CityCoords = {
  [city: string]: CityCoord;
}

export interface WeatherResponse {
  weather: Array<{
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  clouds: {
    all: number;
  };
}

export interface ForecastResponse {
  list: WeatherItem[];
} 