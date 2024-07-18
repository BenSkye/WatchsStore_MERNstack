var createError = require('http-errors');
var express = require('express');
var app = express();
var cors = require('cors');
const passport = require('passport');
require('./passport')(passport);

const mongoose = require('mongoose');
const url =
  'mongodb+srv://nhatdm9a7:123@ass2.f0v4s0d.mongodb.net/?retryWrites=true&w=majority&appName=ass2';
const connect = mongoose.connect(url);
connect.then(() => {
  console.log('connect success');
});
var indexRouter = require('./routes/index');
const authRoute = require('./routes/authRoute');
const brandRoute = require('./routes/brandRoute');
const watchRoute = require('./routes/watchRoute');
const memberRoute = require('./routes/memberRoute');
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);

app.use('/auth', authRoute);
app.use('/brands', brandRoute);
app.use('/watchs', watchRoute);
app.use('/member', memberRoute);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  res.status(err.status || 500).json({
    message: err.message || 'An unexpected error occurred',
  });
});

module.exports = app;
