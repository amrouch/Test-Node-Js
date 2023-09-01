const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({

    name: {
        type: String
    },

    description: {
        type: String
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number
    }
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;