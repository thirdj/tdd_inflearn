const Sequelize = require('sequelize');
const seqObj = new Sequelize({
  dialect: 'sqlite',  // db
  storage: './db.sqlite', // 파일 위치
  logging: false // default console.log 와 bind 되어 있어서 query 문을 보여줌.
});

// 파라미터는 1. 테이블명, 2. 속성
// id 는 자동 생성됨.
const User = seqObj.define('User', {
  name: {
    type: Sequelize.STRING, // varchar 255
    unique: true
  }
});

module.exports = {Sequelize, seqObj, User};
