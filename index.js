const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routes/todoHandler');

// express app initialization
const app = express();
app.use(express.json());

// application connect with mongoose
mongoose
  .connect('mongodb://localhost/todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connection successful'))
  .catch((err) => console.log(err));

// application routes
app.use('/todo', todoHandler);

// default error handler
function errorHandler(err, req, res, next) {
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.listen(5000, () => {
  console.log('App listening at port 5000');
});
