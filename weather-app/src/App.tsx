import { useState, useEffect } from 'react'
import { 
  Box, 
  Container, 
  Grid,
  Typography
} from '@mui/material'
import dayjs from 'dayjs';
import './App.css'

// 導入類型
import { CityWeather } from './types/weather';

// 導入組件
import WeatherHeader from './components/WeatherHeader';
import CitySelector from './components/CitySelector';
import CurrentWeather from './components/CurrentWeather';
import AirConditions from './components/AirConditions';
import HourlyForecast from './components/HourlyForecast';
import WeeklyForecast from './components/WeeklyForecast';
import ErrorAlert from './components/ErrorAlert';
import LoadingSpinner from './components/LoadingSpinner';

// 導入服務和工具
import {
  fetchCurrentWeather,
  fetchWeatherForecast,
  getHourlyForecasts,
  getDailyForecasts,
  assembleWeatherData
} from './services/weatherApi';

/**
 * 天氣應用主組件
 */
function App() {
  // 狀態管理
  const [selectedCity, setSelectedCity] = useState('台北市');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<CityWeather | null>(null);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());
  
  // 計算日期限制範圍
  const today = dayjs().startOf('day');
  const minDate = today.subtract(5, 'day');
  
  // 獲取天氣數據
  useEffect(() => {
    const fetchWeatherData = async () => {
      // 開始載入
      setLoading(true);
      setError(null);
      
      try {
        const selectedDateStr = selectedDate ? selectedDate.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD');
        const today = dayjs().startOf('day');
        const isToday = selectedDate ? selectedDate.isSame(today, 'day') : true;
        const isPastDate = selectedDate ? selectedDate.isBefore(today, 'day') : false;
        
        console.log(`正在獲取${selectedCity}在${selectedDateStr}的天氣數據...`);
        
        // 1. 獲取當前天氣
        const currentData = await fetchCurrentWeather(selectedCity);
        
        // 2. 獲取天氣預報
        const forecastData = await fetchWeatherForecast(selectedCity);
        
        // 3. 處理小時預報數據
        const hourlyForecasts = getHourlyForecasts(forecastData, selectedDate, isToday, isPastDate);
        
        // 4. 處理每日預報數據
        const dailyForecasts = getDailyForecasts(forecastData, selectedDate, isPastDate);
        
        // 5. 組裝天氣數據
        const weatherData = assembleWeatherData(
          currentData,
          hourlyForecasts,
          dailyForecasts,
          selectedDate,
          isToday,
          isPastDate
        );
        
        // 6. 更新狀態
        setWeather(weatherData);
        
      } catch (err) {
        console.error('獲取天氣數據出錯:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('獲取天氣數據失敗，請稍後再試');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchWeatherData();
  }, [selectedCity, selectedDate]);
  
  // 處理城市選擇變更
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };
  
  // 處理日期選擇變更
  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
  };
  
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      color: 'white', 
      pt: 3, 
      pb: 5 
    }} className="starry-background">
      <Container maxWidth="xl">
        {/* 頁頭和日期選擇器 */}
        <WeatherHeader
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          minDate={minDate}
          maxDate={today}
        />
        
        {/* 城市選擇器 */}
        <CitySelector
          selectedCity={selectedCity}
          onCityChange={handleCityChange}
        />
        
        {/* 錯誤提示 */}
        <ErrorAlert message={error} />
        
        {/* 載入中顯示 */}
        {loading ? (
          <LoadingSpinner />
        ) : weather ? (
          <Grid container spacing={3}>
            {/* 左側容器：當前天氣、空氣狀況和小時預報 */}
            <Grid item xs={12} md={6}>
              {/* 當前天氣 */}
              <CurrentWeather
                city={selectedCity}
                selectedDate={selectedDate}
                temperature={weather.currentTemp}
                description={weather.weatherDesc}
                icon={weather.icon}
              />
              
              {/* 空氣狀況 */}
              <AirConditions
                realFeel={weather.realFeel}
                windSpeed={weather.windSpeed}
                clouds={weather.clouds}
                humidity={weather.humidity}
              />
              
              {/* 小時預報 */}
              <HourlyForecast hourlyData={weather.hourly} />
            </Grid>
            
            {/* 右側容器：每週預報 */}
            <Grid item xs={12} md={6}>
              {/* 每週預報 */}
              <WeeklyForecast weeklyData={weather.weekly} />
            </Grid>
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography>請設置有效的 API 金鑰以獲取天氣數據</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default App;
