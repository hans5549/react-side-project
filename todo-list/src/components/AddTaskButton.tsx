import Button from '@mui/material/Button';

interface AddTaskButtonProps {
  onClick: () => void;
}

export default function AddTaskButton({ onClick }: AddTaskButtonProps) {
  return (
    <Button 
      variant="contained" 
      onClick={onClick}
      sx={{ 
        bgcolor: '#6366F1', 
        '&:hover': { bgcolor: '#5253CF' },
        borderRadius: 2,
        px: 3
      }}
    >
      Add Task
    </Button>
  );
} 