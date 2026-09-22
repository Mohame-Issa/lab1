import React, { useState, useEffect } from 'react';
import { fetchTodos } from './api/todos';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

function App() {
  const [todos, setTodos] = useState([]);
  // a) State for current filter: 'all', 'active', or 'done'[cite: 1]
  const [filter, setFilter] = useState('all');

  // b) Re-run fetchTodos whenever the filter state changes[cite: 1]
  useEffect(() => {
    const loadTodos = async () => {
      try {
        let queryParam;
        if (filter === 'active') queryParam = false;
        else if (filter === 'done') queryParam = true;
        else queryParam = undefined; // 'all'

        const data = await fetchTodos(queryParam);
        setTodos(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error('Failed to load todos', err);
      }
    };

    loadTodos();
  }, [filter]);

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Todo App</h1>

      {/* Todo Form for adding new todos */}
      <TodoForm setTodos={setTodos} />

      {/* c) UI: Three simple buttons or tabs for filtering placed above the TodoList[cite: 1] */}
      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        <button 
          onClick={() => setFilter('all')} 
          style={{ fontWeight: filter === 'all' ? 'bold' : 'normal', padding: '6px 12px' }}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('active')} 
          style={{ fontWeight: filter === 'active' ? 'bold' : 'normal', padding: '6px 12px' }}
        >
          Active
        </button>
        <button 
          onClick={() => setFilter('done')} 
          style={{ fontWeight: filter === 'done' ? 'bold' : 'normal', padding: '6px 12px' }}
        >
          Done
        </button>
      </div>

      {/* Todo List component */}
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;