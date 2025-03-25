import { 
  WbSunny as SunnyIcon,
  Cloud as CloudIcon,
  Thunderstorm as ThunderstormIcon,
  WaterDrop as RainIcon
} from '@mui/icons-material';
import { SxProps } from '@mui/material';
import { WeatherIconType } from '../types/weather';

interface WeatherIconProps {
  iconType: WeatherIconType;
  sx?: SxProps;
}

/**
 * 天氣圖標組件
 * 根據傳入的圖標類型顯示不同的天氣圖標
 */
const WeatherIcon = ({ iconType, sx = { fontSize: { xs: 40, md: 64 } } }: WeatherIconProps) => {
  switch(iconType) {
    case 'sunny':
      return <SunnyIcon sx={sx} />;
    case 'rain':
      return <RainIcon sx={sx} />;
    case 'thunderstorm':
      return <ThunderstormIcon sx={sx} />;
    case 'cloud':
    default:
      return <CloudIcon sx={sx} />;
  }
};

export default WeatherIcon; 