# node.js 를 이용한 TDD

### 어플리케이션
 
1. 익스프레스 인스턴스를 어플리케이션이라고 한다.
2. 서버에 필요한 기능인 미들웨어를 어플리케이션에 추가한다.
3. 라우팅 설정을 할 수 있다.
4. 서버를 요청 대기 상태로 만들수 있다.

### 미들웨어
1. 미들웨어는 함수들의 연속이다.
2. 로깅 미들웨어를 만들어 보자.
3. 써드파티 미들웨어를 사용해 보자.
4. 일반 미들웨어 vs 에러 미들웨어
5. 404, 500 에러 미들웨어를 만들어 보자.
6. 미들웨어는 3개의 인자를 가짐.
7. 미들웨어는 자기 역할을 다 한 다음에 next 를 호출 해줘야 다른 미들웨어들이 호출 됨.


### 라우팅
1. 요청 URL에 대해 적절한 핸들러 함수로 연결해 주는 기능.
2. 어플리케이션의 get(), post() 메소드로 구현할 수 있음.
3. 라우팅을 위한 전용 Router 클래스를 사용할 수도 있다.

## 테스트 주도 개발
### mocha
  - 테스트 코드를 돌려주는 테스트 러너
  - 테스트 수트: 테스트 환경으로 모카에서는 describe() 으로 구혆나다.
  - 테스트 케이스: 실제 테스트를 말하며 모카에서는 it()으로 구현한다.
  - 실행은 $ node_modules/mocha/bin/mocha *.spec.js

### should
  - https://github.com/tj/should.js/
  - 노드 assert 말고 서드파티 라이브러리를 사용해라.
  - should 는 검증(assertion) 라이브러리다.
  - 가독성 높은 테스트 코드를 만들 수 있다.

### superTest
  - 단위 테스트: 함수의 기능 테스트
  - 통합 테스트: API의 기능 테스트
  - 슈퍼 테스트는 익스프레스 통합 테스트용 라이브러리이다.
  - 내부적으로 익스프레스 서버를 구동시켜 실제 요청을 보낸 뒤 결과를 검증한다.

```
describe === test suite
it === test case

// 해당 내용만 테스트 하도록 함
describe.only(...)
it.only(...)
```

## API 테스트 만들기
  - 성공
    1. 유저 객체를 담은 배열로 응답한다
    2. 최대 limit 갯수만큼 응답한다

  - 실패
    1. limit이 숫자형이 아니면 400을 응답한다
    2. offset이 숫자형이 아니면 400을 응답한다

```
  supertest 는 상태코드를 검증하는 validate 를 제공 함.
    - expect(200||400)
      .end(done); // 콜백과 동일
```


### POST /users
- success
  1. 201 상태코드를 반환한다.
  2. 생성된 유저 객체를 반환한다.
  3. 입력한 name을 반환한다.

- error
  1. name 파라미터 누락시 400을 반환한다.
  2. name이 중복일 경우 409를 반환한다.

```
body 를 지원하지 않아 bodyParser 사용해야함.
multer 는 이미지나 영상등 큰 데이터를 처리할 때 사용 함.
```

### PUT /users/:id
- success
  1. 변경된 name 을 응답한다.

- error
  1. 정수가 아닌 id일 경우 400 응답
  2. name이 없을 경우 400 응답
  3. 없는 유저일 경우 404 응답
  4. 이름이 중복일 경우 409 응답

### ORM
  - 데이터베이스를 객체로 추상화해 노은 것을 ORM(Object Realational Mapping) 라고 함.
  - 쿼리를 직접 작성하는 대신 ORM 의 메소드로 데이터 관리 할 수 있는 것이 장점이다.
  - 노드에서 SQL ORM은 시퀄라이저(Sequelize)가 있다.

##### Usage
```
insert users('name') values('alice');
-> User.create({name: 'alice'});

select * from users;
-> User.findAll();

update users set name = 'bek' where id = 1;
-> User.update({name: 'bek'}, {where: {id: 1}});

delete from users where id = 1;
-> User.destroy({where: {id: 1}});
```

##### Model
  - 데이터베이스 테이블을 ORM으로 추상화 한 것을 모델이라고 한다.
  - 우리가 사용할 유저 모델을 만들어 보자.
    * sequelize.define(): 모델 정의
    * sequelize.sync(): 데이터베이스 연동