'use strict';

const path = require('path');
const app = require('express')();

const port = process.env.PORT || 8080;

app.use('/', express.static(path.join(__dirname, 'testheroku')));

app.listen(process.env.PORT || 8080);