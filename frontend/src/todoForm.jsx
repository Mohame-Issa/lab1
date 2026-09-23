import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    setSubmitting(true);
    try {
      await onAdd(trimmed);
      setTitle('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        aria-label="New todo title"
      />
      <button
        type="submit"
        className="btn-primary"
        disabled={!title.trim() || submitting}
      >
        {submitting ? 'Adding…' : 'Add'}
      </button>
    </form>
  );
}

export default TodoForm;