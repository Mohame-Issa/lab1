const Todo = require('../models/Todo');


const getTodos = async (req, res) => {
  try {
    const { done } = req.query;

    let filter = {};
    if (done !== undefined) {
      filter.done = done === 'true';
    }

    const todos = await Todo.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getTodos,
};