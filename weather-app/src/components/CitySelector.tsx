import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { TAIWAN_CITIES } from '../constants';

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

/**
 * 城市選擇器組件
 */
const CitySelector = ({ selectedCity, onCityChange }: CitySelectorProps) => {
  // 處理城市選擇變更
  const handleCityChange = (event: SelectChangeEvent) => {
    onCityChange(event.target.value);
  };
  
  return (
    <FormControl fullWidth sx={{ mb: 4 }}>
      <Select
        value={selectedCity}
        onChange={handleCityChange}
        displayEmpty
        sx={{ 
          bgcolor: 'white',
          color: '#051440',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },
        }}
      >
        {TAIWAN_CITIES.map((city) => (
          <MenuItem key={city} value={city}>
            {city}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CitySelector; 