import {useState} from 'react';
import { Todo } from "./types";
import { makeStyles } from '@material-ui/core/styles';
import { TodoForm } from './components/TodoForm';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoDesc } from './components/TodoDesc';
import { getTodos, addTodo, updateTodo, deleteTodo } from './API/api';
 import { useMutation, useQuery, useQueryClient } from 'react-query';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
  },
  todoListContainer: {
    backgroundColor: '#fef3c7',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    width: '100%',
    maxWidth: 360,
    minHeight: '70vh',
    overflow: 'auto', // will allow the container to scroll when content overflows
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
  },
}));


function App() {
  const classes = useStyles();

  const [input, setInput] = useState<string>("");
  const [filter, setFilter] = useState<string>("All");

  const queryClient = useQueryClient();
  const { data: todos = [] } = useQuery("todos", getTodos);

  const mutationAdd = useMutation(addTodo, {
    onSuccess: () => queryClient.invalidateQueries('todos')
  });

  const mutationUpdate = useMutation<Todo, unknown, { id: number, updatedTodo: Todo }, unknown>(
    ({ id, updatedTodo }) => updateTodo(id, updatedTodo),
    {
      onSuccess: () => queryClient.invalidateQueries('todos')
    }
  );

  const mutationDelete = useMutation(deleteTodo, {
    onSuccess: () => queryClient.invalidateQueries('todos')
  });

  const handleToggleStatus = async (id: number) => {
    const todo = todos.find((todo: Todo) => todo.id === id);
    if (todo) {
      const updatedStatus = todo.status === "completed" ? "incompleted" : "completed";
      const updatedTodo = { ...todo, status: updatedStatus };
      console.log("Updated Todo: ", updatedTodo); // For debug
      mutationUpdate.mutate({ id, updatedTodo });
    }
  };

  const handleAddTodo = async () => {
    if (input === "") {
      return;
    }
    const newTodo: Todo = {
      id: Math.floor(Math.random() * 1000),
      title: input,
      status: "incompleted"
    };
    mutationAdd.mutate(newTodo);
    setInput("");
  };

  const handleDeleteTodo = (id: number) => {
    mutationDelete.mutate(id);
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