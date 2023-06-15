import { TextField, IconButton, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    textField: {
        borderWidth: 2,
        width: '80%',
        borderRadius: theme.shape.borderRadius,
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'navy',
            },
            '&:hover fieldset': {
                borderColor: 'navy',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'navy',
            },
        },
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center', // To align items vertically in the center
        justifyContent: 'center', // To align items horizontally in the center
    }
}));

interface TodoFormProps {
    input: string; // The inputted text
    handleAddTodo: () => void;
    setInput: (value: string) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ input, handleAddTodo, setInput }) => {
    const classes = useStyles();

    return (
        <form className={classes.form}>
            <TextField
                label="New todo"
                value={input}
                onChange={e => setInput(e.target.value)}
                variant="outlined"
                className={classes.textField}
            />
            <IconButton color="primary" onClick={handleAddTodo} className={classes.button}>
                <AddIcon />
            </IconButton>
        </form>
    );
};