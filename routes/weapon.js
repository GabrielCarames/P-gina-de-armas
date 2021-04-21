var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController')
const weaponController = require('../controllers/weaponController')

router.get('/', function(req, res) {
    res.render('weapon/weapons');
});

router.get('/uploadweapon', function(req, res) {
    res.render('weapon/uploadweapon');
});

router.post('/uploadweapon', async function(req, res) {
    const weapon = req.body
    const userId = req.user._id
    var actualWeapon = await weaponController.createWeapon(weapon)
    await userController.addWeapon(userId, actualWeapon)
    req.flash('messageSuccess', 'La publicación se ha creado correctamente')
    res.redirect(req.get('referer'));
});

module.exports = router;