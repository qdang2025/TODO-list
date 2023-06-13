import axios from 'axios';
import { Todo } from '../types';

const api = axios.create({
    baseURL: 'https://648708e7beba6297278fb99b.mockapi.io',
});

export const getTodos = async () => {
    const response = await api.get('/todos');
    return response.data;
};

export const addTodo = async (newTodo: Todo) => {
    const response = await api.post('/todos', newTodo);
    return response.data;
};

export const updateTodo = async (todoId: Number, updatedTodo: Todo) => {
    console.log("API Update Called: ", todoId, updatedTodo); // debug
    const response = await api.put(`/todos/${todoId}`, updatedTodo);
    return response.data;
};
export const deleteTodo = async (todoId : Number) => {
    const response = await api.delete(`/todos/${todoId}`);
    return response.data;
};
