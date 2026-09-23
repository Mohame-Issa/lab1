import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/todos',
});

// done: undefined -> all, false -> active, true -> done
export const fetchTodos = async (done) => {
  const config = done === undefined ? {} : { params: { done } };
  const res = await api.get('/', config);
  return res.data;
};

export const createTodo = async (title) => {
  const res = await api.post('/', { title });
  return res.data;
};

export const updateTodo = async (id, updates) => {
  const res = await api.put(`/${id}`, updates);
  return res.data;
};

export const deleteTodo = async (id) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};