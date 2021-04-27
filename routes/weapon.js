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

router.get('/weaponcategory/:category', async function(req, res) {
    var category = req.params.category
    var weapons = await weaponController.getWeaponsByFilters(category, null)
    var actualCategory = await weaponController.getActualCategory()
    var actualPrice = await weaponController.getActualPrice()
    res.render('weapon/weapons', {weapons, actualCategory, actualPrice});
});

router.get('/weaponprice/:price', async function(req, res) {
    var price = req.params.price
    var weapons = await weaponController.getWeaponsByFilters(null, price)
    var actualCategory = await weaponController.getActualCategory()
    var actualPrice = await weaponController.getActualPrice()
    res.render('weapon/weapons', {weapons, actualCategory, actualPrice});
});

/*router.get('/weaponfilters/:category/:price', async function(req, res) {
    var category = req.params.category
    var price = req.params.price
    if(price == 0) price = null
    var weapons = await weaponController.getWeaponsByFilters(category, price)



    var weapons = await weaponController.getAllWeaponsPrice(price)
    res.render('weapon/weapons', {weapons});
});*/


/*
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

router.get('/weaponfilters/:category/:price', async function(req, res) {
    var category = req.params.category
    var price = req.params.price
    if(price == 0) price = null
    var weapons = await weaponController.getWeaponsByFilters(category, price)



    var weapons = await weaponController.getAllWeaponsPrice(price)
    res.render('weapon/weapons', {weapons});
});*/

module.exports = router;