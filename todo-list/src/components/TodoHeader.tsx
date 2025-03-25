import Typography from '@mui/material/Typography';

export default function TodoHeader() {
  return (
    <Typography 
      variant="h2" 
      component="h1" 
      align="center" 
      gutterBottom
      sx={{ 
        fontWeight: 'bold',
        color: '#5A5B7F',
        mb: 4
      }}
    >
      TODO LIST
    </Typography>
  );
} 