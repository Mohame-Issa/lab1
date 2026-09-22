import React, { useState, useEffect } from 'react';
import { fetchTodos } from './api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  // a) Small piece of state for the current filter ('all', 'active', or 'done')
  const [filter, setFilter] = useState('all');

  // b) Re-run fetchTodos whenever the filter changes
  useEffect(() => {
    const loadTodos = async () => {
      try {
        let queryParam;
        if (filter === 'active') queryParam = false;
        else if (filter === 'done') queryParam = true;
        else queryParam = undefined; // 'all'

        const data = await fetchTodos(queryParam);
        // Handles standard backend response structure
        setTodos(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error('Failed to load todos', err);
      }
    };

    loadTodos();
  }, [filter]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '500px', margin: 'auto' }}>
      <h1>Todo App</h1>

      {/* c) UI: Three simple buttons or a tab control */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={() => setFilter('all')} 
          style={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('active')} 
          style={{ fontWeight: filter === 'active' ? 'bold' : 'normal' }}
        >
          Active
        </button>
        <button 
          onClick={() => setFilter('done')} 
          style={{ fontWeight: filter === 'done' ? 'bold' : 'normal' }}
        >
          Done
        </button>
      </div>

      {/* Todo List Display */}
      <ul>
        {todos.map((todo) => (
          <li key={todo._id || todo.id} style={{ textDecoration: todo.done ? 'line-through' : 'none', marginBottom: '8px' }}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;