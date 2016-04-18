var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var multer = require('multer');
var session = require('express-session');
var SessionStore = require('express-mysql-session');

var routes = require('./routes/index');
var department = require('./routes/department');
var employee = require('./routes/employee');
var classes = require('./routes/classes');
var subclass = require('./routes/subclass');
var warehouse = require('./routes/warehouse');
var stock = require('./routes/stock');
var status = require('./routes/status');
var login = require('./routes/login');
var logout = require('./routes/logout');

var connection = require('./connection');
var sessions = require('./session');

connection.init();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));

var options = {
    host: 'localhost',
    port: 3306,
    user: 'session',
    password: 'session',
    database: 'session'
};
var sessionStore = new SessionStore(options);

app.use(cookieParser());
app.use(session({
    key: 'app_smmwmsv2',
    secret: 'number college tip interest ',
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}));

app.use('/', routes);
app.use('/login', login);
app.use('/logout', logout);
app.use('/department', sessions.getLoginStatus, department);
app.use('/employee', sessions.getLoginStatus, employee);
app.use('/class', sessions.getLoginStatus, classes);
app.use('/subclass', sessions.getLoginStatus, subclass);
app.use('/warehouse', sessions.getLoginStatus, warehouse);
app.use('/stock', sessions.getLoginStatus, stock);
app.use('/status', sessions.getLoginStatus, status);

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
