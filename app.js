var createError = require('http-errors');
const exphbs  = require('express-handlebars');
var express = require('express');
var path = require('path');
const passport = require('passport');
const session = require('express-session'); 
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./passport/authenticator');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

var app = express();

// hbs engine settings
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  partialsDir: __dirname + '/views/partials',
  extname: '.hbs',
}));
app.set('view engine', 'hbs');

// passport settings
app.use(session({
  secret: "clave secreta",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require("./db");

app.use('/', indexRouter);
app.use('/user', userRouter);

module.exports = app;
