import TodoItem from './todoItem';

const EMPTY_MESSAGES = {
  all: { title: 'No todos yet', text: 'Add your first task above to get started.' },
  active: { title: 'All caught up', text: 'Nothing pending — nice work!' },
  done: { title: 'Nothing completed yet', text: 'Finished tasks will show up here.' },
};

function TodoList({ todos, loading, filter, onToggle, onDelete }) {
  if (loading && todos.length === 0) {
    return (
      <ul className="todo-list" aria-busy="true">
        {[1, 2, 3].map((n) => (
          <li key={n} className="skeleton" />
        ))}
      </ul>
    );
  }

  if (todos.length === 0) {
    const msg = EMPTY_MESSAGES[filter];
    return (
      <div className="empty">
        <div className="empty-icon" aria-hidden="true">✓</div>
        <p className="empty-title">{msg.title}</p>
        <p className="empty-text">{msg.text}</p>
      </div>
    );
  }

  return (
    <ul className={`todo-list ${loading ? 'is-refreshing' : ''}`}>
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;
