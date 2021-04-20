var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res) {
  res.render('user/register');
});

router.get('/login', function(req, res) {
  res.render('user/login');
});

router.post('/register', passport.authenticate('register',
  {
    successRedirect: '/user/login',
    failureRedirect: '/user/register',
    failureFlash: true,
    passReqToCallback: true
  }
));

router.post('/login', passport.authenticate('login',
  {
    successRedirect: '/',
    failureRedirect: '/user/login',
    passReqToCallback: true
  }
));

module.exports = router;
