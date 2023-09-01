const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({

    firstName: {
        type: String
    },

    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String, default: 'CLIENT'
    }
});

const Client = mongoose.model('client', ClientSchema);

module.exports = Client;