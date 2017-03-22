const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const user = require('./api/user');

// middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', user);

// 테스트 스크립트 실행시에도 실행이 되기 때문에 따로 분리 함.
// app.listen(port, () => {
//   console.log(`Server is running http://${host}:${port}`);
// });

// 모듈화
module.exports = app;
