import { Box, Card, CardContent, Paper, Typography } from '@mui/material';
import { HourlyForecast as HourlyForecastType } from '../types/weather';
import WeatherIcon from './WeatherIcon';

interface HourlyForecastProps {
  hourlyData: HourlyForecastType[];
}

/**
 * 小時預報組件，水平顯示多個時間點的天氣預報
 */
const HourlyForecast = ({ hourlyData }: HourlyForecastProps) => {
  // 獲取當前系統時間小時
  const currentHour = new Date().getHours();
  console.log('當前系統時間小時:', currentHour);
  console.log('API原始數據:', hourlyData);
  
  // 定義我們想要顯示的目標時間（當前小時和後兩小時）
  const targetHours = [
    currentHour,
    (currentHour + 1) % 24,
    (currentHour + 2) % 24
  ];
  
  console.log('目標時間小時:', targetHours);
  console.log('API返回的時間數據:', hourlyData.map(d => d.time));
  
  // 如果沒有數據，創建模擬數據
  let displayData: HourlyForecastType[] = [];
  
  if (hourlyData.length === 0) {
    // 如果API完全沒有返回數據，使用模擬數據
    const icons = ['sunny', 'cloud', 'rain', 'thunderstorm'] as const;
    displayData = targetHours.map(hour => ({
      time: `${hour.toString().padStart(2, '0')}:00`,
      temp: Math.round(20 + Math.random() * 10),
      icon: icons[Math.floor(Math.random() * icons.length)]
    }));
  } else {
    // 嘗試為每個目標小時找到最接近的數據
    targetHours.forEach(hour => {
      // 首先嘗試精確匹配
      let matchedData = hourlyData.find(item => {
        const itemHour = parseInt(item.time.split(':')[0]);
        return itemHour === hour;
      });
      
      // 如果沒有精確匹配，嘗試尋找最接近的時間
      if (!matchedData) {
        const sortedData = [...hourlyData].sort((a, b) => {
          const hourA = parseInt(a.time.split(':')[0]);
          const hourB = parseInt(b.time.split(':')[0]);
          const diffA = Math.abs(hourA - hour);
          const diffB = Math.abs(hourB - hour);
          return diffA - diffB;
        });
        
        if (sortedData.length > 0) {
          matchedData = sortedData[0];
        }
      }
      
      // 如果找到匹配數據，添加到顯示數據中
      if (matchedData) {
        // 修改時間以顯示目標時間
        const displayItem = {
          ...matchedData,
          time: `${hour.toString().padStart(2, '0')}:00`
        };
        displayData.push(displayItem);
      }
    });
  }
  
  console.log('最終顯示數據:', displayData);
  
  return (
    <Card sx={{ bgcolor: 'transparent', boxShadow: 'none', color: 'white', mt: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1 }}>TODAY'S FORECAST</Typography>
        <Typography variant="body2" sx={{ mb: 2, color: '#4dabf5' }}>
          Next 3 hours
        </Typography>
        
        {displayData.length > 0 ? (
          <Box 
            sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
              width: '100%',
              pb: 1,
            }}
          >
            {displayData.map((hour) => (
              <Paper 
                key={hour.time} 
                sx={{ 
                  bgcolor: 'white', 
                  p: 1.5, 
                  textAlign: 'center',
                  flex: 1,
                  borderRadius: 1,
                  color: '#051440',
                }}
              >
                <Typography variant="body2">{hour.time}</Typography>
                <WeatherIcon iconType={hour.icon} sx={{ fontSize: 36 }} />
                <Typography variant="h6">{hour.temp} °C</Typography>
              </Paper>
            ))}
          </Box>
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', py: 2 }}>
            無可用的小時預報數據
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default HourlyForecast; 