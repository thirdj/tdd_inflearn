// test code

const supertest = require('supertest');
const should = require('should');

const app = require('../../index');
const models = require('../../models');

describe.only('GET /users는 ', () => {

  describe('성공시', () => {

    // 샘플 데이터를 넣어 줌.
    const users = [{name: 'alice'}, {name: 'bek'}, {name: 'chris'}];
    before(() => models.seqObj.sync({force: true}));

    // 여러개의 데이터를 입력 해줌.
    before(() => models.User.bulkCreate(users));
    // 해당 케이스만 테스트 하도록 함.
    // it.only();
    it('유저 객체를 담은 배열로 응답한다', done => {
      supertest(app)
        .get('/users')
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });

    it('최대 limit 갯수만큼 응답한다.', done => {
      supertest(app)
        .get('/users?limit=2')
        .end((err, res) => {
          res.body.should.have.lengthOf(2)
          done();
        });
    });
  });

  describe('실패시 ', () => {
    it('limit이 숫자가 아니면 400을 응답한다.', done => {
      // supertest 는 상태코드를 검증하는 validate 를 제공 함.
      // 그게 expect
      supertest(app)
        .get('/users?limit=ss')
        .expect(400)
        .end(done); // 위 콜백과 동일
    });
  });
});

describe('GET /users/1는 ', () => {
  describe('성공시 ', () => {
    it('id가 2인 유저 객체를 반환한다', done => {
      supertest(app)
        .get('/users/2')
        .end((err, res) => {
          res.body.should.have.property('id', 2);
          done();
        });
    })
  });
  describe('실패시 ', () => {
    it('id 가 숫자가 아닐경우 400으로 응답한다. ', done => {
      supertest(app)
        .get('/users/dd')
        .expect(400)
        .end(done);
    });
    it('id로 유저를 찾을 수 없을 때 404로 응답한다. ', done => {
      supertest(app)
        .get('/users/5')
        .expect(404)
        .end(done);
    })
  })
});
/*
describe('DELETE /users/1', () => {
  describe('성공시 ', () => {
    it('204를 응답한다', done => {
      supertest(app)
        .delete('/users/1')
        .expect(204)
        .end(done);
    });
  })
  describe('실패시 ', () => {
    it('id 가 숫자가 아닐경우 400으로 응답한다.', done => {
      supertest(app)
        .delete('/users/ㅇㅇ')
        .expect(400)
        .end(done);
    });
  });
})
*/
describe('POST /users/', () => {
  describe('성공시 ', () => {
    // before it 실행시 미리 실행 되는 함수
    // 중복코드 방지
    let body;
    let name = 'thirdj';
    before(done => {
      supertest(app)
        .post('/users')
        .send({ name })
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    })
    it('생성된 유저 객체를 반환한다.', () => {
      // before 에서 body 라는 반환값이 있으므로 body 만 가지고 체크 하면 됨.
      body.should.have.property('id');
    });
    it('입력한 name을 반환한다.', () => {
      body.should.have.property('name', name);
    })
  });
  describe('실패시 ', () => {
    it('name 파라미터 누락시 400을 반환한다', done => {
      supertest(app)
        .post('/users')
        .send({})
        .expect(400)
        .end(done)
    });
    it('name 이 중복일 경우 409를 반환한다', done => {
      supertest(app)
        .post('/users')
        .send({name: 'thirdj'})
        .expect(409)
        .end(done)
    });
  })
});

describe('PUT /users/:id ', () => {
  describe('성공시 ', () => {
    it('변경된 name을 응답한다. ', done => {
      const name = 'thirdjj'
      supertest(app)
        .put('/users/3')
        .send({ name })
        .end((err, res) => {
          res.body.should.property('name', name);
          done();
        });
    })
  });

  describe('실패시 ', () => {
    it('정수가 아닌 ID 일 경우 400을 응답한다.', done => {
      supertest(app)
        .put('/users/one')
        .expect(400)
        .end(done)
    });

    it('ㅜname 이 없을 경우 400을 응답한다.', done => {
      supertest(app)
        .put('/users/323232')
        .expect(400)
        .end(done)
    });

    it('없는 유저일 경우 404를 응답한다.', done => {
      supertest(app)
        .put('/users/999')
        .send({name: '333'}) // 미리 값을 던져 놓고 확인 함.
        .expect(404)
        .end(done)
    });

    it('이름이 중복일 경우 409를 응답한다.', done => {
      supertest(app)
        .put('/users/2')
        .send({name: '222'})
        .expect(409)
        .end(done)
    });
  });
});

