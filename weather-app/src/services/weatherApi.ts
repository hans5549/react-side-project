import { Dayjs } from 'dayjs';
import { API_KEY, API_URL, CITY_COORDS } from '../constants';
import {
  CityWeather,
  DailyForecast,
  HourlyForecast,
  WeatherItem,
  WeatherResponse,
  ForecastResponse
} from '../types/weather';
import {
  mapWeatherIcon,
  getDayOfWeek,
  generatePastHourlyForecasts,
  generatePastDailyForecasts
} from '../utils/weatherUtils';

/**
 * 獲取當前天氣數據
 */
export const fetchCurrentWeather = async (city: string): Promise<WeatherResponse> => {
  const coords = CITY_COORDS[city];
  const url = `${API_URL}/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${API_KEY}&lang=zh_tw`;
  
  console.log('正在獲取當前天氣...');
  console.log('請求 URL:', url);
  
  const response = await fetch(url);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('當前天氣請求失敗:', response.status, errorText);
    throw new Error(`獲取當前天氣失敗: ${response.status} ${errorText}`);
  }
  
  const data = await response.json();
  console.log('當前天氣數據:', data);
  
  return data;
};

/**
 * 獲取天氣預報數據
 */
export const fetchWeatherForecast = async (city: string): Promise<ForecastResponse> => {
  const coords = CITY_COORDS[city];
  const url = `${API_URL}/forecast?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${API_KEY}&lang=zh_tw`;
  
  console.log('正在獲取天氣預報...');
  console.log('請求 URL:', url);
  
  const response = await fetch(url);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('天氣預報請求失敗:', response.status, errorText);
    throw new Error(`獲取天氣預報失敗: ${response.status} ${errorText}`);
  }
  
  const data = await response.json();
  console.log('天氣預報數據:', data);
  
  return data;
};

/**
 * 根據天氣預報數據獲取小時預報
 */
export const getHourlyForecasts = (
  forecastData: ForecastResponse,
  selectedDate: Dayjs | null,
  isToday: boolean,
  isPastDate: boolean
): HourlyForecast[] => {
  // 如果是過去日期，使用模擬數據
  if (isPastDate) {
    const selectedDateStr = selectedDate ? selectedDate.format('YYYY-MM-DD') : '';
    console.log(`${selectedDateStr}是過去日期，使用模擬數據`);
    return generatePastHourlyForecasts(selectedDateStr);
  }
  
  // 篩選選定日期的數據
  const selectedDateStartTime = selectedDate ? selectedDate.startOf('day').unix() : 0;
  const selectedDateEndTime = selectedDate ? selectedDate.endOf('day').unix() : 0;
  
  // 篩選出當天的數據
  const filteredHourlyData = forecastData.list.filter((item: WeatherItem) => {
    return item.dt >= selectedDateStartTime && item.dt <= selectedDateEndTime;
  });
  
  // 如果有篩選出的數據，使用這些數據
  if (filteredHourlyData.length > 0) {
    return filteredHourlyData.map((item: WeatherItem) => {
      // 保留API返回的原始時間格式
      const date = new Date(item.dt * 1000);
      const hours = date.getHours();
      const hoursStr = hours.toString().padStart(2, '0');
      
      return {
        time: `${hoursStr}:00`,
        temp: Math.round(item.main.temp),
        icon: mapWeatherIcon(item.weather[0].icon)
      };
    });
  }
  
  // 如果是今天但沒有具體小時數據，使用可用的預報數據
  if (isToday) {
    return forecastData.list
      .slice(0, 8)
      .map((item: WeatherItem) => {
        const date = new Date(item.dt * 1000);
        const hours = date.getHours();
        const hoursStr = hours.toString().padStart(2, '0');
        
        return {
          time: `${hoursStr}:00`,
          temp: Math.round(item.main.temp),
          icon: mapWeatherIcon(item.weather[0].icon)
        };
      });
  }
  
  throw new Error(`無法獲取所選日期的小時天氣預報數據`);
};

/**
 * 根據天氣預報數據獲取每日預報
 */
export const getDailyForecasts = (
  forecastData: ForecastResponse,
  selectedDate: Dayjs | null,
  isPastDate: boolean
): DailyForecast[] => {
  // 將預報數據按日期分組
  const dailyData: {[key: string]: WeatherItem} = {};
  forecastData.list.forEach((item: WeatherItem) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toISOString().split('T')[0];
    
    // 如果這個日期還沒有數據，或者這是中午左右的數據（優先使用中午的數據）
    if (!dailyData[dateKey] || (date.getHours() >= 11 && date.getHours() <= 13)) {
      dailyData[dateKey] = item;
    }
  });
  
  // 轉換為我們需要的格式
  let dailyForecasts: DailyForecast[] = Object.keys(dailyData)
    .map(dateKey => {
      const item = dailyData[dateKey];
      return {
        day: getDayOfWeek(item.dt),
        temp: Math.round(item.main.temp),
        icon: mapWeatherIcon(item.weather[0].icon),
        precip: item.pop ? Math.round(item.pop * 100) : 0, // 降水概率
        desc: item.weather[0].description,
        wind: item.wind.speed,
        humidity: item.main.humidity
      };
    });
  
  // 如果選擇的日期是過去的，並且沒有預報數據，則生成模擬數據
  if (isPastDate && dailyForecasts.length === 0) {
    const selectedDateStr = selectedDate ? selectedDate.format('YYYY-MM-DD') : '';
    console.log(`${selectedDateStr}是過去日期，沒有預報數據，生成模擬每日數據`);
    dailyForecasts = generatePastDailyForecasts(selectedDate, selectedDateStr);
  }
  
  return dailyForecasts;
};

/**
 * 組裝天氣數據
 */
export const assembleWeatherData = (
  currentData: WeatherResponse,
  hourlyForecasts: HourlyForecast[],
  dailyForecasts: DailyForecast[],
  selectedDate: Dayjs | null,
  isToday: boolean,
  isPastDate: boolean
): CityWeather => {
  
  if (isToday) {
    // 今天的天氣使用當前天氣API的數據
    const icon = mapWeatherIcon(currentData.weather[0].icon);
    
    return {
      currentTemp: Math.round(currentData.main.temp),
      weatherDesc: currentData.weather[0].description,
      realFeel: Math.round(currentData.main.feels_like),
      windSpeed: currentData.wind.speed,
      clouds: currentData.clouds.all,
      humidity: currentData.main.humidity,
      icon,
      hourly: hourlyForecasts,
      weekly: dailyForecasts
    };
  } else if (isPastDate) {
    // 過去日期使用模擬數據
    const selectedDateStr = selectedDate ? selectedDate.format('YYYY-MM-DD') : '';
    console.log(`顯示${selectedDateStr}的模擬天氣數據`);
    
    // 找到該日期對應的模擬每日數據
    const selectedDayOfWeek = selectedDate ? getDayOfWeek(selectedDate.unix()) : '';
    const pastDateForecast = dailyForecasts.find(d => d.day === selectedDayOfWeek) || dailyForecasts[0];
    
    return {
      currentTemp: pastDateForecast.temp,
      weatherDesc: pastDateForecast.desc,
      realFeel: pastDateForecast.temp + 1,
      windSpeed: pastDateForecast.wind,
      clouds: pastDateForecast.precip,
      humidity: pastDateForecast.humidity,
      icon: pastDateForecast.icon,
      hourly: hourlyForecasts,
      weekly: dailyForecasts
    };
  } else {
    // 未來日期使用預報數據
    const selectedDayOfWeek = selectedDate ? getDayOfWeek(selectedDate.unix()) : '';
    const futureDateForecast = dailyForecasts.find(d => d.day === selectedDayOfWeek);
    
    if (!futureDateForecast) {
      throw new Error(`無法獲取所選日期的天氣預報數據`);
    }
    
    return {
      currentTemp: futureDateForecast.temp,
      weatherDesc: futureDateForecast.desc,
      realFeel: futureDateForecast.temp + 1, // 感覺溫度通常略高於實際溫度
      windSpeed: futureDateForecast.wind,
      clouds: futureDateForecast.precip, // 使用降水概率代替雲量
      humidity: futureDateForecast.humidity,
      icon: futureDateForecast.icon,
      hourly: hourlyForecasts,
      weekly: dailyForecasts
    };
  }
}; 