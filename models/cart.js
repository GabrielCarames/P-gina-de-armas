const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const Cart = new Schema({
    user: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    weapons: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Weapon',
        }
    ],
    totalprice: {
        type: Number,
        required: true
    },
    createdAt: {
         type: Date, 
         default: Date.now
    }
})

module.exports = model("Cart", Cart)