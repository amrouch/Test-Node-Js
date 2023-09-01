const express = require('express');
const router = express.Router();
const Command = require('../models/CommandModel');
const Product = require('../models/ProductModel');
const passport = require('passport');

router.get('/commands', passport.authenticate('bearer', { session: false }), async (req, res) => {
    try {
        const commands = await Command.find({});
        res.json(commands);
        console.log(commands);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/commands/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
    try {
        const command = await Command.findById(req.params.id).populate('products');
        res.json(command);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/commands', passport.authenticate('bearer', { session: false }), async (req, res) => {

    try {
        let Price = 0;
        await Promise.all(req.body.products.map(async (item) => {

            const product = await Product.findById(item);
            await Product.findByIdAndUpdate(product._id, { $inc: { quantity: -1 } }, { new: true })
            Price += product.price
            console.log(Price)
        }))

        Command.create({ totalPrice: Price, Products: req.body.Products, customer: req.user._id })

            .then((order) => {
                res.status(200).json({ message: 'Success Order!', order: order })
            })

    } catch (error) {
        res.status(500).send({ message: 'Server Error' })
        console.log(error)

    }
})

router.put('/commands/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
    try {
        const Update = await Command.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(Update);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/commands/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
    try {
        const Delete = await Command.findByIdAndRemove(req.params.id)
        res.json({ message: 'command deleted successfully' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
