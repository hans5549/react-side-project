import { Dayjs } from 'dayjs';
import { DailyForecast, HourlyForecast, WeatherIconType } from '../types/weather';

/**
 * 將OpenWeatherMap圖標代碼轉換為我們的圖標類型
 */
export const mapWeatherIcon = (iconCode: string): WeatherIconType => {
  const code = iconCode.substring(0, 2);
  
  switch(code) {
    case '01': // 晴天
      return 'sunny';
    case '02': // 少雲
    case '03': // 多雲
    case '04': // 陰天
      return 'cloud';
    case '09': // 小雨
    case '10': // 雨
      return 'rain';
    case '11': // 雷雨
      return 'thunderstorm';
    default:
      return 'cloud';
  }
};

/**
 * 將日期轉換為星期
 */
export const getDayOfWeek = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return days[date.getDay()];
};

/**
 * 生成用於過去日期的偽隨機數
 * @param seed 種子數字
 * @param i 索引或偏移量
 * @returns 0-1之間的隨機數
 */
export const pseudoRandom = (seed: number, i: number): number => {
  return ((seed * 9301 + 49297) * (i + 233)) % 233280 / 233280;
};

/**
 * 為過去日期生成小時天氣預報模擬數據
 */
export const generatePastHourlyForecasts = (selectedDateStr: string): HourlyForecast[] => {
  const hours = ['09:00', '12:00', '15:00', '18:00', '21:00', '00:00'];
  const icons: WeatherIconType[] = ['sunny', 'cloud', 'rain', 'thunderstorm'];
  
  // 使用日期字符串作為隨機數種子
  const dateSeed = selectedDateStr.replace(/-/g, '');
  const seedNumber = parseInt(dateSeed);
  
  return hours.map((hour, i) => {
    const random = pseudoRandom(seedNumber, i);
    const tempBase = 15 + Math.floor(random * 15); // 15-30度之間
    const iconIndex = Math.floor(random * 4);
    
    return {
      time: hour,
      temp: tempBase,
      icon: icons[iconIndex]
    };
  });
};

/**
 * 為過去日期生成每日天氣預報模擬數據
 */
export const generatePastDailyForecasts = (selectedDate: Dayjs | null, selectedDateStr: string): DailyForecast[] => {
  // 生成過去5天的模擬數據
  const pastDays = [];
  for (let i = 0; i < 6; i++) {
    const day = selectedDate ? selectedDate.subtract(i, 'day') : null;
    if (day) pastDays.push(day);
  }
  
  const dateSeed = selectedDateStr.replace(/-/g, '');
  const seedNumber = parseInt(dateSeed);
  const icons: WeatherIconType[] = ['sunny', 'cloud', 'rain', 'thunderstorm'];
  const descriptions = ['晴天', '多雲', '陣雨', '雷陣雨'];
  
  return pastDays.map((day, i) => {
    const random = pseudoRandom(seedNumber, i + 1);
    const iconIndex = Math.floor(random * 4);
    
    return {
      day: getDayOfWeek(day.unix()),
      temp: Math.floor(15 + random * 15), // 15-30度之間
      icon: icons[iconIndex],
      precip: Math.floor(random * 100), // 0-100%
      desc: descriptions[iconIndex],
      wind: 2 + random * 4, // 2-6 m/s
      humidity: 50 + Math.floor(random * 40) // 50-90%
    };
  });
}; 