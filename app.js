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
var weaponRouter = require('./routes/weapon');

var app = express();

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  partialsDir: __dirname + '/views/partials',
  extname: '.hbs',
}));
app.set('view engine', 'hbs');



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

/*app.use((req, res, next) => {
  if(req.isAuthenticated()){
    console.log("sosreputo")
    var user = req.user
    res.locals.user = user
  }
  next();
});*/

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/weapon', weaponRouter);

require("./db");

module.exports = app;
