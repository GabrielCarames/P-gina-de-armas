const User = require('../models/user');

exports.findByUsername = async (name) => {
    return User.findOne({ 'username': name })
}

exports.createUser = async (values) => {
    const { username, password, email, country, gender } = values
    const newUser = new User({ username, password, email, country, gender })
    await newUser.save()
    return newUser
}

exports.findById = async (id) => {
    return User.findById(id)
}
