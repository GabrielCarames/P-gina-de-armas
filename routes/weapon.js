var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController')
const weaponController = require('../controllers/weaponController')

router.get('/', async function(req, res) {
    var weapons = await weaponController.getAllWeapons()
    res.render('weapon/weapons', {weapons});
});

router.get('/uploadweapon', function(req, res) {
    res.render('weapon/uploadweapon');
});

router.post('/uploadweapon', async function(req, res) {
    const weapon = req.body
    const userId = req.user._id
    var actualWeapon = await weaponController.createWeapon(weapon)
    await userController.addWeaponToUser(userId, actualWeapon)
    req.flash('messageSuccess', 'La publicación se ha creado correctamente')
    res.redirect(req.get('referer'));
});
//luego de hacer cada filtro individual, crear un sistema central en el que le entrarian de parametros la categoria seleccionada, rango de precio, etc
//si se quiere filtrar por pistolas, pero con todos los precios, hacer cierto if y eso
router.get('/weaponcategory/:category', async function(req, res) {
    const cuenta = req.user
    var category = req.params.category
    var weapons = await weaponController.getAllWeaponsCategory(category)
    res.render('weapon/weapons', {cuenta, weapons});
});

router.get('/weaponprice/:price', async function(req, res) {
    var price = req.params.price
    var weapons = await weaponController.getAllWeaponsPrice(price)
    res.render('weapon/weapons', {weapons});
});

module.exports = router;