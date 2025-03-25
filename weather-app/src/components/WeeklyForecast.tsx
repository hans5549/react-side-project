import { Box, Card, CardContent, Grid, Paper, Typography } from '@mui/material';
import { DailyForecast } from '../types/weather';
import WeatherIcon from './WeatherIcon';

interface WeeklyForecastProps {
  weeklyData: DailyForecast[];
}

/**
 * 每週天氣預報組件，顯示每日天氣情況列表
 */
const WeeklyForecast = ({ weeklyData }: WeeklyForecastProps) => {
  return (
    <Card sx={{ bgcolor: 'transparent', boxShadow: 'none', color: 'white' }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3 }}>WEEKLY FORECAST</Typography>
        
        {weeklyData.map((day) => (
          <Paper 
            key={day.day}
            sx={{ 
              bgcolor: 'white', 
              p: 2, 
              mb: 2,
              borderRadius: 1,
              color: '#051440'
            }}
          >
            <Grid container alignItems="center">
              <Grid item xs={3}>
                <Typography variant="body1">{day.day}</Typography>
              </Grid>
              <Grid item xs={3} sx={{ textAlign: 'center' }}>
                <WeatherIcon iconType={day.icon} sx={{ fontSize: 40 }} />
              </Grid>
              <Grid item xs={3} sx={{ textAlign: 'center' }}>
                <Typography variant="body1">{day.precip} %</Typography>
              </Grid>
              <Grid item xs={3} sx={{ textAlign: 'right' }}>
                <Typography variant="body1">{day.temp} °C</Typography>
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ mr: 1 }}>{day.desc}</Typography>
                </Box>
              </Grid>
              <Grid item xs={3} sx={{ textAlign: 'center' }}>
                <Typography variant="body2">{day.wind.toFixed(2)} m/s</Typography>
              </Grid>
              <Grid item xs={3} sx={{ textAlign: 'right' }}>
                <Typography variant="body2">{day.humidity} %</Typography>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </CardContent>
    </Card>
  );
}

export default WeeklyForecast; 