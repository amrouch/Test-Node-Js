const express = require('express');
const router = express.Router();
const Client = require('../models/ClientModel');
const passport = require('passport');

router.get('/clients', passport.authenticate('bearer', { session: false }), async (req, res) => {
    try {
        const clients = await Client.find({});
        res.json(clients);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/clients/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        res.json(client);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/clients', passport.authenticate('bearer', { session: false }), async (req, res) => {
    try {
        const Create = await Client.create(req.body)
        res.json(Create);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/clients/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
    try {
        const Update = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(Update);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/clients/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
    try {
        const Delete = await Client.findByIdAndRemove(req.params.id)
        res.json({ message: 'client deleted successfully' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;