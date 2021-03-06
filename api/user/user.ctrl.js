
const models = require('../../models');

const index = (req, res) => {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end(); // 기본 status code 는 200
  }

  models.User.findAll({ limit })
    .then(users => {
      res.json(users);
    });
};

const show = (req, res) => {
  // 기본 문자열이라서 parseInt 사용함.
  const id = parseInt(req.params.id, 10);
  // const user = users.filter(user => user.id === id)[0]; // Array

  if (Number.isNaN(id)) return res.status(400).end();

  models.User.findOne({
      where: { id }
    })
    .then(user => {
      if (!user) return res.status(404).end();
      res.json(user);
    });
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  // users = users.filter(user => user.id !== id);
  models.User.destroy({
    where: { id }
  }).then(() => {
    res.status(204).end();
  });

};

const create = (req, res) => {
  // body 를 지원하지 않아 bodyParser 사용해야함.
  // multer 는 이미지나 영상등 큰 데이터를 처리할 때 사용 함.
  const name = req.body.name;
  // const id = Date.now();
  // const user = {id, name};

  if (!name) return res.status(400).end();

  models.User.create({name})
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).end();
      }
      res.status(500).end();
    });

  // 중복 체크
  // const hasUser = users.filter(user => user.name === name).length;
  // if (hasUser) return res.status(409).end();

  // users.push(user);

};

const update = (req, res) => {
  const id = parseInt(req.params.id, 10); // param
  if (Number.isNaN(id)) return res.status(400).end();

  const name = req.body.name; // send data 라서 body
  if (!name) return res.status(400).end();

  // const isConflict = users.filter(user => user.name === name).length;
  // if (isConflict) return res.status(409).end();

  // const user = users.filter(user => user.id === id)[0];
  // if (!user) return res.status(404).end();

  models.User.findOne({where: {id}})
    .then(user => {
      if (!user) return res.status(404).end();
  
      user.name = name; 
      user.save()
          .then(() => {
            res.json(user);
          })
          .catch(err => {
            // console.error('err ', err);
            if (err.name === 'SequelizeUniqueConstraintError') {
              return res.status(409).end();
            }
            res.status(500).end();
          });
    })

};

module.exports = {
  index,
  show,
  destroy,
  create,
  update
};