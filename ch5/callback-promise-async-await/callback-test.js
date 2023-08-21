const DB = [];

// 1. 회원 가입  API 함수
function register(user) {
  // 3중으로 중첩
  return saveDB(user, function (user) {
    //콜백
    return sendEmail(user, function (user) {
      // 콜백
      return getResult(user); // 콜백
    });
  });
}

// 2. DB에 저장 후 콜백 실행
function saveDB(user, callback) {
  DB.push(user);
  console.log(`save ${user.name} to DB`);
  callback(user);
}

// 3. 이메일 발송 로그만 남기는 코드 실행 후 콜백 실행
function sendEmail(user, callback) {
  console.log(`email to ${user.name}`);
  callback(user);
}

// 4. 최종 결과를 출력하는 함수
function getResult(user) {
  console.log(`success register ${user.name}`);
  return user;
}

const result = register({
  email: "hugo@gmail.com",
  password: "123123",
  name: "hugo",
});
console.log(result);
