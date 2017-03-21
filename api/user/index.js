
const users = [
  {id: 1, name: '111'},
  {id: 2, name: '222'},
  {id: 3, name: '333'}
];

app.get('/users', (req, res) => {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end(); // 기본 status code 는 200
  }
  res.json(users.slice(0, limit));
});

app.get('/users/:id', (req, res) => {
  // 기본 문자열이라서.
  const id = parseInt(req.params.id, 10);
  const user = users.filter(user => user.id === id)[0]; // Array

  if (Number.isNaN(id)) return res.status(400).end();
  if (!user) return res.status(404).end();

  res.json(user);
});

app.delete('/users/:id', (req, res) => {

})

app.post('/users', (req, res) => {
  // body 를 지원하지 않아 bodyParser 사용해야함.
  // multer 는 이미지나 영상등 큰 데이터를 처리할 때 사용 함.
  const name = req.body.name;
  const id = Date.now();
  const user = {id, name};

  if (!name) return res.status(400).end();

  // 중복 체크
  const hasUser = users.filter(user => user.name === name).length;
  if (hasUser) return res.status(409).end();

  users.push(user);
  res.status(201).json(user);

});

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10); // param
  if (Number.isNaN(id)) return res.status(400).end();

  const name = req.body.name; // send data 라서 body
  if (!name) return res.status(400).end();

  const isConflict = users.filter(user => user.name === name).length;
  console.log('isConflict '. isConflict);
  if (isConflict) return res.status(409).end();

  const user = users.filter(user => user.id === id)[0];
  if (!user) return res.status(404).end();

  user.name = name;

  res.json(user);
});