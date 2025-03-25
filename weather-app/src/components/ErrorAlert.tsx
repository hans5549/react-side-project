import { Alert } from '@mui/material';

interface ErrorAlertProps {
  message: string | null;
}

/**
 * 錯誤提示組件，顯示API調用或其他操作中的錯誤信息
 */
const ErrorAlert = ({ message }: ErrorAlertProps) => {
  if (!message) return null;
  
  return (
    <Alert severity="error" sx={{ mb: 4 }}>
      {message}
    </Alert>
  );
};

export default ErrorAlert; 