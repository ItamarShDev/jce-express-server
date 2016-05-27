/**
 * [require system needed stuff
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); //get DB
var config = require('config.json')('config/config.json'); //get config json
var Schema = mongoose.Schema; //to create Schema
var db = config.db;
var mongoAddr = db.mongodb;
var mongoAddress = 'mongodb://' + db.user + ':' + db.password + '@' + mongoAddr.host + ':' + mongoAddr.port + '/' + db.appName;
//var mongoAddress = "mongodb://localhost:27017/db";
console.log("Mongo Address", mongoAddress);
var connection = mongoose.createConnection(mongoAddress); //connect to the db server
//Schema = document
var users = new Schema({
  name: String,
  sureName: String,
  mail: String
});
var loginUsers = new Schema({
  name: String,
  mail: String
});
var User = connection.model('User', users);
exports.User = User;
var Users = connection.model('Users', loginUsers);
exports.UsersDB = Users;
/**
 * System Routes
 * routes - API calls
 * users = the user API
 * home - not used for now
 */
var users = require('./routes/users');
var home = require('./routes/home');
var login = require('./routes/login');
//create express app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json()); //get POST data
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
 * routes
 * when in '/' use both routes, and users
 * when in '/home' use home
 */
app.use('/', users);
app.use('/', home);
app.use('/', login);



/**
 * JADE auto error handlers
 */
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
