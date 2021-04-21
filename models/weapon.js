const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const Weapon = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    condition: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false,
        default: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fasia.ifoam.bio%2Fwp-content%2Fuploads%2F2018%2F12%2Favatar__181424.png&f=1&nofb=1',
    },
    createdAt: {
         type: Date, 
         default: Date.now
    }
})

module.exports = model("Weapon", Weapon)