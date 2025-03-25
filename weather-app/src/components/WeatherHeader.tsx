import { Box, Typography } from '@mui/material';
import DateSelector from './DateSelector';
import { Dayjs } from 'dayjs';

interface WeatherHeaderProps {
  selectedDate: Dayjs | null;
  onDateChange: (date: Dayjs | null) => void;
  minDate: Dayjs;
  maxDate: Dayjs;
}

/**
 * 天氣應用的頁首組件
 */
const WeatherHeader = ({ selectedDate, onDateChange, minDate, maxDate }: WeatherHeaderProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
        <span style={{ color: 'white' }}>THE WEATHER</span><br />
        <span style={{ color: '#4dabf5' }}>FORECASTING</span>
      </Typography>
      
      <DateSelector 
        selectedDate={selectedDate}
        onDateChange={onDateChange}
        minDate={minDate}
        maxDate={maxDate}
      />
    </Box>
  );
};

export default WeatherHeader; 