const express = require('express');

// express app initialization
const app = express();
app.use(express.json());

// application routes

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
