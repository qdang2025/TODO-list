import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import { Todo } from "../types";
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    todoCompleted: {
        fontFamily: theme.typography.fontFamily,
        textDecoration: 'line-through',
        color: '#9CA3AF',
    },
    todoNotCompleted: {
        fontFamily: theme.typography.fontFamily,
        textDecoration: 'none',
        color: 'black',
    },
}));

interface TodoListProps {
    todos: Todo[]; // List of todos
    handleToggleStatus: (id: number) => void;
    handleDeleteTodo: (id: number) => void;
    handleUpdateTodo: (id: number, newTitle: string) => void;
    filter: string; // 'All' | 'Done' | 'To do'
}

export const TodoList: React.FC<TodoListProps> = ({ todos, handleToggleStatus, handleDeleteTodo, handleUpdateTodo, filter }) => {
    const classes = useStyles();

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingTitle, setEditingTitle] = useState<string>("");

    return (
        <ul>
            {
                todos.filter((todo) => {
                    if (filter === 'All') return true;
                    if (filter === 'Done') return todo.status === 'completed';
                    if (filter === 'To do') return todo.status === 'incompleted';
                    return true;
                }).map((todo) => (
                    <ListItem key={todo.id} dense button>
                        <ListItemText>
                            {editingId === todo.id ? (
                                <input
                                    type="text"
                                    value={editingTitle}
                                    onChange={(e) => setEditingTitle(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' ? handleUpdateTodo(todo.id, editingTitle) : null}
                                />
                            ) : (
                                <Typography
                                    variant="body2"
                                    onClick={() => handleToggleStatus(todo.id)}
                                    className={todo.status === "completed" ? classes.todoCompleted : classes.todoNotCompleted}
                                    style={{ fontFamily: 'Pangolin, cursive' }}
                                >
                                    {todo.title}
                                </Typography>
                            )}
                        </ListItemText>
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="update" onClick={() => { setEditingId(todo.id); setEditingTitle(todo.title) }}>
                                <UpdateIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTodo(todo.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))
            }
        </ul>
    );
};