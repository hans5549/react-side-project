import Paper from '@mui/material/Paper';
import { ReactNode } from 'react';

interface TodoListContainerProps {
  children: ReactNode;
}

export default function TodoListContainer({ children }: TodoListContainerProps) {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 2, 
        bgcolor: '#F3F4F6', 
        borderRadius: 2,
        minHeight: '300px'
      }}
    >
      {children}
    </Paper>
  );
} 