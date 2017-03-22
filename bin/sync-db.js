// Database sync

const models = require('../models');

// 기존 디비 있어도 날리고 새로 만듬.
// {force: true}
// models.seqObj.sync({force: true});

module.exports = () => {
  return models.seqObj.sync({force: true});
};
