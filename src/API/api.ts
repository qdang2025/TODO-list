import axios from 'axios';
import { Todo } from '../types';

// fetch todos
export const fetchTodos = async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
    return data;
}

// add a todo
export const addTodo = async (newTodo : Todo) => {
    const { data } = await axios.post('https://jsonplaceholder.typicode.com/todos', newTodo);
    return data;
}

// delete a todo
export const deleteTodo = async (id : Number) => {
    const { data } = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    return data;
}