import axios from 'axios';

export const fetchTodos = async (filter) => {
  try {
    let params = {};
    
    if (filter === true || filter === 'true') {
      params.done = true;
    } else if (filter === 'false' || filter === false) {
      params.done = false;
    }

    const response = await axios.get('/api/todos', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};