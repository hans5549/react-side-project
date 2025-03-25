import { Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

interface DateSelectorProps {
  selectedDate: Dayjs | null;
  onDateChange: (date: Dayjs | null) => void;
  minDate: Dayjs;
  maxDate: Dayjs;
}

/**
 * 日期選擇器組件
 */
const DateSelector = ({ selectedDate, onDateChange, minDate, maxDate }: DateSelectorProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-end' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker 
          value={selectedDate}
          onChange={onDateChange}
          minDate={minDate}
          maxDate={maxDate}
          slotProps={{
            textField: {
              size: 'small',
              sx: { 
                bgcolor: 'white', 
                borderRadius: 1,
                width: '180px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                }
              }
            }
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DateSelector; 