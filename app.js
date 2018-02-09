const express = require('express');
const path = require('path');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.use('/api', require('./routes/index'));

app.get('/', (req, res) => {
	res.redirect('/api');
});

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
