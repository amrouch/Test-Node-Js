const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommandeSchema = new Schema({

    totalPrice: {
        type: Number
    },

    products: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'product'
    }],
    clients: {
        type: mongoose.Schema.Types.ObjectId, ref: 'client'
    }
});

const Commande = mongoose.model('commande', CommandeSchema);

module.exports = Commande;