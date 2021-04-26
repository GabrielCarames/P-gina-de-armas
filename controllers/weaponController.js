const Weapon = require('../models/weapon');

exports.createWeapon = async (values) => {
    const {name, description, price, condition, category} = values
    const newWeapon = new Weapon({name, description, price, condition, category})
    await newWeapon.save()
    return newWeapon
}

exports.getWeaponsCategory = async (category) => {
    const weaponsCategory = await this.findByCategory(category)
    return weaponsCategory
}

exports.getAllWeapons = async () => {
    return Weapon.find({}).lean() //el .lean() lo que hace es saltearse ciertos pasos en la consulta a la bd, para que sea mas rapido.
    //y creo que al saltearse estos pasos tambien skipea cosas de seguridad para evitar errores. sin el lean salta un error de que no se puede acceder
    //porque no es de tu propiedad
}

exports.getAllWeaponsCategory = async (category) => {
    return Weapon.find({'category': category}).lean()
}

exports.getAllWeaponsPrice = async (price) => {
    if(price != 0) return Weapon.find({'price': { $lte: price} }).lean()
    else return Weapon.find({}).lean()
}