var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController')
const weaponController = require('../controllers/weaponController');

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
/*
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
});*/

router.get('/weaponfilter/:category/:price', async function(req, res) {
    var category = req.params.category
    var price = req.params.price
    console.log("repete", category, price)
    if(category == 'null') {
        console.log("por aca venis A")
        category = null
    }
    if(price == 'null') {console.log("por aca venisB"); price = null}
    var weapons = await weaponController.getWeaponsByFilters(category, price)
    var actualCategory = await weaponController.getActualCategory()
    var actualPrice = await weaponController.getActualPrice()
    res.render('weapon/weapons', {weapons, actualCategory, actualPrice});
});

router.get('/addweapontocart/:weaponId', async function(req, res) {
    const weaponId = req.params.weaponId
    const userId = req.user._id
    var weapon = await weaponController.findWeaponById(weaponId)
    var user = await userController.findById(userId)
    console.log(user)
    await weaponController.addWeaponAndUserToCart(user, weapon)
    //res.redirect(req.get('referer'));
});

module.exports = router;