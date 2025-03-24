import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';

export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  date: string;
  emoji?: string;
}

interface TodoProps {
  todo: TodoItem;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

export default function Todo({ todo, onDelete, onEdit, onToggleComplete }: TodoProps) {
  const handleToggle = () => {
    onToggleComplete(todo.id);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        my: 1,
        bgcolor: 'white',
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      <Checkbox
        checked={todo.completed}
        onChange={handleToggle}
        sx={{ 
          p: 1,
          color: '#6366F1',
          '&.Mui-checked': {
            color: '#6366F1',
          }
        }}
      />
      <Box sx={{ flexGrow: 1, ml: 2 }}>
        <Typography
          variant="body1"
          sx={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? 'text.secondary' : 'text.primary',
          }}
        >
          {todo.text} {todo.emoji}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {todo.date}
        </Typography>
      </Box>
      <IconButton aria-label="delete" onClick={() => onDelete(todo.id)}>
        <DeleteIcon />
      </IconButton>
      <IconButton aria-label="edit" onClick={() => onEdit(todo.id)}>
        <EditIcon />
      </IconButton>
    </Box>
  );
} 