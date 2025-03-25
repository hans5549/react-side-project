import { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

interface TodoFilterProps {
  filter: string;
  onFilterChange: (event: SelectChangeEvent) => void;
}

export default function TodoFilter({ filter, onFilterChange }: TodoFilterProps) {
  return (
    <FormControl sx={{ minWidth: 120 }}>
      <Select
        value={filter}
        onChange={onFilterChange}
        displayEmpty
        sx={{ 
          bgcolor: '#F3F4F6',
          '.MuiOutlinedInput-notchedOutline': { borderColor: '#F3F4F6' },
          borderRadius: 2
        }}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
      </Select>
    </FormControl>
  );
} 