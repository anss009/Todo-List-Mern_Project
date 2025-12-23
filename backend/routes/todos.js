const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

// Get all todos
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create todo
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;

    const todo = new Todo({
      title,
      description,
      user: req.userId
    });

    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update todo (edit / mark complete)
router.put('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }

    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete todo
router.delete('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }

    res.json({ msg: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
