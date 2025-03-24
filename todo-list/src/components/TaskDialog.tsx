import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { TodoItem } from './Todo';

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  currentTodo: TodoItem | null;
  newTodoText: string;
  onTextChange: (text: string) => void;
}

export default function TaskDialog({
  open,
  onClose,
  onSave,
  currentTodo,
  newTodoText,
  onTextChange
}: TaskDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {currentTodo ? 'Edit Task' : 'Add New Task'}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Task"
          type="text"
          fullWidth
          value={newTodoText}
          onChange={(e) => onTextChange(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
} 