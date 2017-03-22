const Sequelize = require('sequelize');
const seqObj = new Sequelize({
  dialect: 'sqlite',  // db
  storage: './db.sqlite' // 파일 위치
});

// 파라미터는 1. 테이블명, 2. 속성
// id 는 자동 생성됨.
const User = seqObj.define('User', {
  name: Sequelize.STRING // varchar 255
});

module.exports = {Sequelize, seqObj, User};
