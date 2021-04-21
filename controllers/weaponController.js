const Weapon = require('../models/weapon');

exports.createWeapon = async (values) => {
    const {name, description, price, condition} = values
    const newWeapon = new Weapon({name, description, price, condition})
    await newWeapon.save()
    return newWeapon
}