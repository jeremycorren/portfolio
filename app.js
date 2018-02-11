const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'client/public')));
app.use('/api', require('./routes/index'));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/public/index.html'));
});

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
