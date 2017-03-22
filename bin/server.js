const app = require('../index');
const syncDb = require('./sync-db');

const port = 5000;
const host = 'localhost';

syncDb().then(() => {
  console.log('Sync database!');

  app.listen(port, () => {
    console.log(` ==> Server is running http://${host}:${port}`);
  });
});
