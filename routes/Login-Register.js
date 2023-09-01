const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Client = require('../models/ClientModel');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    try {
        const clientExist = await Client.findOne({ email: req.body.email });
        console.log(clientExist);
        if (clientExist) {
            res.send({ message: 'email already exists, please choose another email' });
        }
        else {
            const hashedPwd = await bcrypt.hash(req.body.password, 10);
            const client = await Client.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPwd,
                role: req.body.role
            });
            res.json(client);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.post('/login', async (req, res) => {
    try {
        const client = await Client.findOne({ email: req.body.email });
        if (client) {
            const pass = bcrypt.compare(req.body.password, client.password);
            if (pass) {
                const jwtoken = {
                    clientId: client._id,
                    email: client.email
                };
                const token = jwt.sign(jwtoken, 'your-secret-key', { expiresIn: '1h' });
                res.send({ message: 'Auth Successful', token: token });
            }
            else {
                res.send({ message: "Wrong email or password" });
            }
        }
        else {
            res.send({ message: "Wrong email or password" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error occured");
    }
});

module.exports = router;