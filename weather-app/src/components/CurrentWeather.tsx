import { Box, Card, CardContent, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import WeatherIcon from './WeatherIcon';
import { WeatherIconType } from '../types/weather';

interface CurrentWeatherProps {
  city: string;
  selectedDate: Dayjs | null;
  temperature: number;
  description: string;
  icon: WeatherIconType;
}

/**
 * 當前天氣組件，顯示選擇城市的當前天氣狀況
 */
const CurrentWeather = ({ city, selectedDate, temperature, description, icon }: CurrentWeatherProps) => {
  return (
    <Card sx={{ bgcolor: 'transparent', boxShadow: 'none', color: 'white' }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>CURRENT WEATHER</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h5" fontWeight="bold">{city}</Typography>
            <Typography variant="body1">
              {selectedDate 
                ? `${selectedDate.format('DD MMM YYYY')}`
                : `Today ${new Date().getDate()} ${new Date().toLocaleString('default', { month: 'short' })}`}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h3" fontWeight="bold">{temperature}°C</Typography>
            <Typography variant="body1">{description}</Typography>
          </Box>
          <Box>
            <WeatherIcon iconType={icon} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather; 