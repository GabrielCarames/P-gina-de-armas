var express = require('express');
var router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController')
const weaponController = require('../controllers/weaponController')

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

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
});

router.get('/getweapons', userController.isAuthenticated, async function (req, res) {
  const userId = req.user._id
  const weapons = await userController.getWeapons(userId)
  if(weapons.length){
    res.send({status: true, weapons})
  }else{
    res.send({status: false, message: 'No tienes armas disponibles.'})
  }
})

module.exports = router;
