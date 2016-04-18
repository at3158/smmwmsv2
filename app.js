var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var multer  = require('multer');
var session = require('express-session');

var routes = require('./routes/index');
var department = require('./routes/department');
var employee = require('./routes/employee');
var classes = require('./routes/classes');
var subclass = require('./routes/subclass');
var warehouse = require('./routes/warehouse');
var stock = require('./routes/stock');
var statuse = require('./routes/status');

var connection = require('./connection');
connection.init();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//初始化 Session 的 Cookie
app.use(session({
  secret: 'number college tip interest ',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use('/', routes);
app.use('/department',department);
app.use('/employee',employee);
app.use('/class',classes);
app.use('/subclass',subclass);
app.use('/warehouse',warehouse);
app.use('/stock',stock);
app.use('/status',statuse);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
