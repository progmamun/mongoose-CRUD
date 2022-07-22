const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model('Todo', todoSchema);

// get all the todos
router.get('/', async (req, res) => {
  await Todo.find({ status: 'active' })
    .select({ _id: 0, date: 0 })
    .limit(2)
    .exec((err, data) => {
      if (err) {
        res.status(500).json({ error: 'There was a server side error!' });
      } else {
        res.status(200).json({ result: data, message: 'Success' });
      }
    });
});

// get a todo by id
router.get('/:id', async (req, res) => {
  await Todo.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({ error: 'There was a server side error!' });
    } else {
      res.status(200).json({ result: data, message: 'Success' });
    }
  });
});

// post todo
router.post('/', async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({ error: 'There was a server side error!' });
    } else {
      res.status(200).json({ message: 'Todo was inserted Successfully' });
    }
  });
});

// post multiple todo
router.post('/all', async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({ error: 'There was a server side error!' });
    } else {
      res.status(200).json({ message: 'Todo were inserted Successfully' });
    }
  });
});

// put todo
router.put('/:id', async (req, res) => {
  const result = await Todo.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $set: {
        status: 'active',
      },
    },
    {
      new: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        res.status(500).json({ error: 'There was a server side error!' });
      } else {
        res.status(200).json({ message: 'Todo was updated Successfully' });
      }
    }
  );
});

// delete todo
router.delete('/:id', async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({ error: 'There was a server side error!' });
    } else {
      res.status(200).json({ message: 'Todo was deleted Successfully' });
    }
  });
});

module.exports = router;
