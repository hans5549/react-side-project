import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import {
  WbSunny as SunnyIcon,
  Cloud as CloudIcon,
  Opacity as OpacityIcon,
  Air as WindIcon
} from '@mui/icons-material';

interface AirConditionsProps {
  realFeel: number;
  windSpeed: number;
  clouds: number;
  humidity: number;
}

/**
 * 空氣狀況組件，顯示實際感受溫度、風速、雲量和濕度
 */
const AirConditions = ({ realFeel, windSpeed, clouds, humidity }: AirConditionsProps) => {
  return (
    <Card sx={{ bgcolor: 'transparent', boxShadow: 'none', color: 'white', mt: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>AIR CONDITIONS</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SunnyIcon sx={{ mr: 1 }} />
              <Typography variant="body2">Real Feel</Typography>
            </Box>
            <Typography variant="h6" fontWeight="bold">{realFeel} °C</Typography>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <WindIcon sx={{ mr: 1 }} />
              <Typography variant="body2">Wind</Typography>
            </Box>
            <Typography variant="h6" fontWeight="bold">{windSpeed.toFixed(2)} m/s</Typography>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CloudIcon sx={{ mr: 1 }} />
              <Typography variant="body2">Clouds</Typography>
            </Box>
            <Typography variant="h6" fontWeight="bold">{clouds} %</Typography>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <OpacityIcon sx={{ mr: 1 }} />
              <Typography variant="body2">Humidity</Typography>
            </Box>
            <Typography variant="h6" fontWeight="bold">{humidity} %</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AirConditions; 