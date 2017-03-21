const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const user = require('./api/user');

const port = 5000;
const host = 'localhost';

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', user);

app.listen(port, (req, res) => {
  console.log(`Server is running http://${host}:${port}`);
});

// 모듈화
module.exports = app;
