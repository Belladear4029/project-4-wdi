const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./config/routes');
const { port, dbURI } = require('./config/environment');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

app.use(express.static(`${__dirname}/public`));

mongoose.connect(dbURI, { useNewUrlParser: true });

app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(bodyParser.json());
app.use('/api', routes);

app.listen(port, () => console.log(`Express running on port ${port}`));

module.exports = app;