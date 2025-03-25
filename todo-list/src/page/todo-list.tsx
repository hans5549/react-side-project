import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { SelectChangeEvent } from '@mui/material/Select';
import Container from '@mui/material/Container';
import Todo, { TodoItem } from '../components/Todo';
import TodoFilter from '../components/TodoFilter';
import TaskDialog from '../components/TaskDialog';
import TodoHeader from '../components/TodoHeader';
import EmptyState from '../components/EmptyState';
import AddTaskButton from '../components/AddTaskButton';
import TodoListContainer from '../components/TodoListContainer';

export default function TodoList() {
    // 狀態管理
    const [todos, setTodos] = useState<TodoItem[]>([
        {
            id: 1,
            text: 'Create a react project',
            completed: false,
            date: '5:23 AM, 01/06/2022',
            emoji: '👋'
        },
        {
            id: 2,
            text: 'Learn React',
            completed: false,
            date: '5:22 AM, 01/06/2022',
            emoji: '❤️'
        },
        {
            id: 3,
            text: 'Create a Todo App',
            completed: true,
            date: '5:21 AM, 01/06/2022',
            emoji: '🖥️'
        }
    ]);
    const [filter, setFilter] = useState<string>("all");
    const [openDialog, setOpenDialog] = useState(false);
    const [currentTodo, setCurrentTodo] = useState<TodoItem | null>(null);
    const [newTodoText, setNewTodoText] = useState('');

    // 過濾任務
    const filteredTodos = React.useMemo(() => {
        switch (filter) {
            case 'completed':
                return todos.filter(todo => todo.completed);
            case 'active':
                return todos.filter(todo => !todo.completed);
            default:
                return todos;
        }
    }, [todos, filter]);

    // 處理過濾變更
    const handleFilterChange = (event: SelectChangeEvent) => {
        setFilter(event.target.value as string);
    };

    // 切換完成狀態
    const handleToggleComplete = (id: number) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    // 刪除任務
    const handleDelete = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    // 打開編輯對話框
    const handleEdit = (id: number) => {
        const todoToEdit = todos.find(todo => todo.id === id);
        if (todoToEdit) {
            setCurrentTodo(todoToEdit);
            setNewTodoText(todoToEdit.text);
            setOpenDialog(true);
        }
    };

    // 打開新增任務對話框
    const handleAddTaskClick = () => {
        setCurrentTodo(null);
        setNewTodoText('');
        setOpenDialog(true);
    };

    // 儲存任務（新增或編輯）
    const handleSave = () => {
        if (newTodoText.trim() === '') return;

        if (currentTodo) {
            // 編輯現有任務
            setTodos(todos.map(todo => 
                todo.id === currentTodo.id 
                    ? { ...todo, text: newTodoText, emoji: todo.emoji } 
                    : todo
            ));
        } else {
            // 新增任務
            const now = new Date();
            const formattedDate = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} AM, ${
                (now.getMonth() + 1).toString().padStart(2, '0')}/${
                now.getDate().toString().padStart(2, '0')}/${
                now.getFullYear()}`;

            const newTodo: TodoItem = {
                id: Date.now(),
                text: newTodoText,
                completed: false,
                date: formattedDate
            };
            setTodos([newTodo, ...todos]);
        }
        setOpenDialog(false);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <TodoHeader />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <AddTaskButton onClick={handleAddTaskClick} />
                
                <TodoFilter 
                    filter={filter} 
                    onFilterChange={handleFilterChange} 
                />
            </Box>
            
            <TodoListContainer>
                {filteredTodos.map((todo) => (
                    <Todo 
                        key={todo.id} 
                        todo={todo} 
                        onDelete={handleDelete} 
                        onEdit={handleEdit} 
                        onToggleComplete={handleToggleComplete} 
                    />
                ))}
                
                {filteredTodos.length === 0 && <EmptyState />}
            </TodoListContainer>
            
            <TaskDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onSave={handleSave}
                currentTodo={currentTodo}
                newTodoText={newTodoText}
                onTextChange={setNewTodoText}
            />
        </Container>
    );
}

