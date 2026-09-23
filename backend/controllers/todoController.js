const Todo = require('../models/Todo');

// GET /api/todos            -> all todos
// GET /api/todos?done=true  -> only completed
// GET /api/todos?done=false -> only pending
const getTodos = async (req, res) => {
  try {
    // a) Read the query parameter
    const { done } = req.query;

    // b) Build the filter conditionally (empty = return everything)
    const filter = {};
    if (done === 'true') filter.done = true;
    else if (done === 'false') filter.done = false;
    else if (done !== undefined) {
      return res
        .status(400)
        .json({ message: "Query param 'done' must be 'true' or 'false'" });
    }

    // c) Pass the filter into find()
    const todos = await Todo.find(filter).sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch todos', error: err.message });
  }
};

const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }
    const todo = await Todo.create({ title: title.trim() });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create todo', error: err.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update todo', error: err.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.status(200).json({ message: 'Todo deleted', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete todo', error: err.message });
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };