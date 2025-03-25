import { Box, CircularProgress } from '@mui/material';

/**
 * 載入中顯示組件，在數據請求期間顯示加載動畫
 */
const LoadingSpinner = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
      <CircularProgress sx={{ color: 'white' }} />
    </Box>
  );
};

export default LoadingSpinner; 