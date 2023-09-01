const express = require('express');
const router = express.Router();
const Product = require('../models/ProductModel')
const passport = require('passport');

router.get('/products', passport.authenticate('bearer', { session: false }), async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/products/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/products', passport.authenticate('bearer', { session: false }), async (req, res) => {
    try {
        const create = await Product.create(req.body)
        res.json(create);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/products/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
    try {
        const Update = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(Update);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/products/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
    try {
        const Delete = await Product.findByIdAndRemove(req.params.id)
        res.json({ message: 'product deleted successfully' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;