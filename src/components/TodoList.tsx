import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Todo } from "../types";

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
    todos: Todo[];
    handleToggleStatus: (id: number) => void;
    handleDeleteTodo: (id: number) => void;
    filter: string;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, handleToggleStatus, handleDeleteTodo, filter }) => {
    const classes = useStyles();

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
                            <Typography
                                variant="body2"
                                onClick={() => handleToggleStatus(todo.id)}
                                className={todo.status === "completed" ? classes.todoCompleted : classes.todoNotCompleted}
                                style={{ fontFamily: 'Pangolin, cursive' }}
                            >
                                {todo.title}
                            </Typography>
                        </ListItemText>
                        <ListItemSecondaryAction>
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