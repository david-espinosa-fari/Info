const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const index = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.listen(port, () => console.log('App listening on port ' + port + ' !'));



