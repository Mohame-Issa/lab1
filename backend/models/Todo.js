const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    done: { type: Boolean, default: false },
  },
  { timestamps: true } // adds createdAt / updatedAt, used for sorting
);

module.exports = mongoose.model('Todo', todoSchema);