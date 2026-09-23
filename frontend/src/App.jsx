import { useState, useEffect, useCallback } from 'react';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api/todos';
import TodoList from './todoList';
import TodoForm from './todoForm';
import './todo.css';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'done', label: 'Done' },
];

const SUBTITLES = {
  all: (n) => `${n} ${n === 1 ? 'task' : 'tasks'} in total`,
  active: (n) => `${n} still to do`,
  done: (n) => `${n} completed`,
};

function App() {
  const [todos, setTodos] = useState([]);
  // State for the current filter: 'all' | 'active' | 'done'
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Server-side filtering: map the UI filter to the ?done= query param
  const loadTodos = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      let doneParam; // undefined -> 'all'
      if (filter === 'active') doneParam = false;
      else if (filter === 'done') doneParam = true;

      const data = await fetchTodos(doneParam);
      setTodos(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error('Failed to load todos', err);
      setError('Could not reach the server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  // Re-fetch whenever the filter changes (loadTodos changes when filter does)
  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const handleAdd = async (title) => {
    try {
      await createTodo(title);
      await loadTodos();
    } catch (err) {
      console.error(err);
      setError('Could not add the todo.');
    }
  };

  const handleToggle = async (todo) => {
    try {
      await updateTodo(todo._id, { done: !todo.done });
      await loadTodos(); // item may leave the current filtered view
    } catch (err) {
      console.error(err);
      setError('Could not update the todo.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      setError('Could not delete the todo.');
    }
  };

  return (
    <div className="page">
      <main className="card">
        <header className="card-header">
          <p className="eyebrow">Software Project I</p>
          <h1>My Todos</h1>
          <p className="subtitle">{SUBTITLES[filter](todos.length)}</p>
        </header>

        <TodoForm onAdd={handleAdd} />

        <div className="filters" role="tablist" aria-label="Filter todos">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={filter === f.key}
              className={`filter-btn ${filter === f.key ? 'is-active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {error && <div className="alert">{error}</div>}

        <TodoList
          todos={todos}
          loading={loading}
          filter={filter}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default App;