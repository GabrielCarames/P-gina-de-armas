const Weapon = require("../models/weapon");
var actualWeaponsCategoryAndPrice;
var actualCategory;
var actualPrice;

exports.createWeapon = async (values) => {
  const { name, description, price, condition, category } = values;
  const newWeapon = new Weapon({
    name,
    description,
    price,
    condition,
    category,
  });
  await newWeapon.save();
  return newWeapon;
};

exports.getWeaponsCategory = async (category) => {
  const weaponsCategory = await this.findByCategory(category);
  return weaponsCategory;
};

exports.getAllWeapons = async () => {
  actualCategory = null;
  actualPrice = null;
  return Weapon.find({}).lean(); //el .lean() lo que hace es saltearse ciertos pasos en la consulta a la bd, para que sea mas rapido.
  //y creo que al saltearse estos pasos tambien skipea cosas de seguridad para evitar errores. sin el lean salta un error de que no se puede acceder
  //porque no es de tu propiedad
};

exports.getAllWeaponsCategory = async (category) => {
  return Weapon.find({ category: category }).lean();
};

exports.getAllWeaponsPrice = async (price) => {
  if (price != 0) return Weapon.find({ price: { $lte: price } }).lean();
  else return Weapon.find({}).lean();
};

exports.getActualCategory = async () => {
    return actualCategory
};

exports.getActualPrice = async () => {
    return actualPrice
};

exports.getWeaponsByFilters = async (category, price) => {
  console.log("sosvos???")
  console.log(category, price)
  console.log(actualCategory, actualPrice)
  if (category && !actualPrice) {
    console.log("soya")
    actualCategory = category;
    return Weapon.find({ category: category }).lean();
  }
  if (price && !actualCategory) {
    console.log("soyacacreo cs", price, category,actualCategory)
    actualPrice = price;
    return Weapon.find({ price: { $lte: price } }).lean();
  }
  if (category && actualPrice) {
    console.log("soyb")
    actualCategory = category;
    return Weapon.find({
      $and: [{ category: category }, { price: { $lte: actualPrice } }],
    }).lean();
  }
  if (price && actualCategory) {
    console.log("soyc")
    actualPrice = price;
    console.log(actualCategory, price)
    return Weapon.find({
      $and: [{ category: actualCategory }, { price: { $lte: price } }],
    }).lean();
  }

  /*
    if(price && category) {
        if(!price) return Weapon.find({'category': category}, {'price': {$lte: price}})
        else return Weapon.find({}).lean()
    }*/
};
