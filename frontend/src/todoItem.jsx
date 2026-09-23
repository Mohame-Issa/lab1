function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.done ? 'is-done' : ''}`}>
      <button
        className="check"
        onClick={() => onToggle(todo)}
        aria-label={todo.done ? 'Mark as not done' : 'Mark as done'}
      >
        {todo.done && (
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
            <path
              d="M5 12.5l4.5 4.5L19 7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <span className="todo-title">{todo.title}</span>

      <button
        className="btn-delete"
        onClick={() => onDelete(todo._id)}
        aria-label="Delete todo"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path
            d="M6 6l12 12M18 6L6 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </li>
  );
}

export default TodoItem;