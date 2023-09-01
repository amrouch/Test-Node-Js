const Client = require("../models/ClientModel")
const passport = require('passport');
const jwt = require('jsonwebtoken');
const BearerStrategy = require('passport-http-bearer').Strategy;

passport.use(new BearerStrategy(
    async (token, done) => {
        try {
            const decoded = jwt.verify(token, 'your-secret-key');
            const client = await Client.findById(decoded.clientId);
            if (!client) {
                return done(null, false);
            }
            else {
                return done(null, client, { scope: 'all' });
            }

        }
        catch (err) {
            console.log(err);
            return done(null, false);
        }
    }
));