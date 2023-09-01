const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const clientAPI = require('./routes/Client');
const productAPI = require('./routes/Product');
const commandAPI = require('./routes/Commande');
const login_registe_Api = require('./routes/Login-Register');

require('./config/connect');
require('./passport/strategy')

app.use(express.json());
app.use(bodyParser.json());

app.use(clientAPI);
app.use(productAPI);
app.use(commandAPI);
app.use(login_registe_Api);

app.use(function (err, req, res, next) {
    res.status(422).send({ error: err.message });
});

app.listen(process.env.port || 4000, function () {
    console.log('now listening for requests')
});