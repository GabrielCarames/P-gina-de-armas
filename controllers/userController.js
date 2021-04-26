const User = require('../models/user');

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

exports.addWeaponToUser = async (userId, newWeapon) => {
    await User.findOneAndUpdate({ _id: userId },
        {
            $push: {
                weapons: newWeapon
            }
        }
    )
}

exports.createUser = async (values) => {
    const { username, password, email, country, gender } = values
    const newUser = new User({ username, password, email, country, gender })
    await newUser.save()
    return newUser
}

exports.findById = async (id) => {
    return User.findById(id).populate([
        {
            path: 'weapons',
            model: 'Weapon',
            populate: {
                path: 'from',
                model: 'User'
            }
        }
    ])
}

exports.findByUsername = async (name) => {
    return User.findOne({ 'username': name })
}


exports.findByEmail = async (email) => {
    return User.findOne({ 'email': email })
}

exports.getWeaponsFromUser = async (userId) => {
    const user = await this.findById(userId)
    return user.weapons
}
