import {useState} from 'react';
import { Todo } from "./types";
import { makeStyles } from '@material-ui/core/styles';
import { TodoForm } from './components/TodoForm';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoDesc } from './components/TodoDesc';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
  },
  todoListContainer: {
    backgroundColor: '#fef3c7',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    width: '100%',
    maxWidth: 360,
    overflowY: 'auto',
    minHeight: '70vh',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
  },
}));


function App() {

  const classes = useStyles();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");
  const [filter, setFilter] = useState<string>("All");

  const generateId = (): number => {
    return Date.now();
  };

  const handleToggleStatus = (id: number) => {
    setTodos(e =>
      e.map(todo =>
        todo.id === id ? { ...todo, status: todo.status === "completed" ? "incompleted" : "completed" } : todo
      )
    );
  };

  const handleAddTodo = () => {
    // Prevent empty todos
    if (input === "") {
      return;
    }

    const newTodo: Todo = {
      id: generateId(),
      title: input,
      status: "incompleted"
    };

    setTodos([...todos, newTodo]);

    // Reset input
    setInput("");
  };

  const handleDeleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className={classes.container}>
      <div className="App">
        <TodoDesc description="This is your todo list!" />
        <TodoForm input={input} handleAddTodo={handleAddTodo} setInput={setInput} />
        <div className={classes.todoListContainer}>
          <TodoFilter filter={filter} setFilter={setFilter} />
          <TodoList todos={todos} handleToggleStatus={handleToggleStatus} handleDeleteTodo={handleDeleteTodo} filter={filter} />
        </div>
      </div>
    </div>
  );
}

export default App;