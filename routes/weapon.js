var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController')
const weaponController = require('../controllers/weaponController')

router.get('/', async function(req, res) {
    var weapons = await userController.getWeapons(req.user._id)
    console.log(weapons)
    res.render('weapon/weapons', {weapons});
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