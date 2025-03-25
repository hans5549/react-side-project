import Typography from '@mui/material/Typography';

export default function EmptyState() {
  return (
    <Typography 
      align="center" 
      color="text.secondary"
      sx={{ py: 4 }}
    >
      No tasks found
    </Typography>
  );
} 