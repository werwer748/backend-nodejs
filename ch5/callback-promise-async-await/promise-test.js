const DB = [];

function saveDB(user) {
  const oldDBSize = DB.length;
  //   const oldDBSize = DB.length + 1; // 에러 발생을 위해 +1
  DB.push(user);
  console.log(`DB에 ${user.name} 저장`);

  return new Promise((resolve, reject) => {
    // 콜백 대신 Promise 객체를 반환
    if (DB.length > oldDBSize) {
      resolve(user); // 성공 시 유저 정보 반환
    } else {
      reject(`${user.name} 저장 실패`); // 1. 실패 시 에러
    }
  });
}

function sendEmail(user) {
  console.log(`이메일을 ${user.name}님께 전송함.`);
  return new Promise((resolve) => {
    // Promise 객체를 반환. 실패 처리 X
    resolve(user);
  });
}

function getResult(user) {
  return new Promise((resolve, reject) => {
    // Promise 객체를 반환
    resolve(`${user.name}님 회원가입 성공`); // 성공 시 메시지 반환
  });
}

function registerByPromise(user) {
  // 2. 비동기 호출이지만, 순서를 지켜서 실행
  const result = saveDB(user)
    .then(sendEmail)
    .then(getResult)
    .catch((error) => new Error(error))
    // 성공, 실패 여부에 관계없이 실행
    .finally(() => console.log("registerByPromise 완료"));

  // 3. 아직 완료전.. 지연(pending) 상태
  console.log(result);
  return result;
}

const myUser = {
  email: "hugo@gmail.com",
  password: "123123",
  name: "hugo",
};

const result = registerByPromise(myUser);

// console.log(result);
result.then(console.log);
// 결과값이 Promise 객체이므로 then 메서드를 사용해야 함

//? Promise.all
// allResult = Promise.all([saveDB(myUser), sendEmail(myUser), getResult(myUser)]);
// allResult.then(console.log);

/*
? then의 사용법

* then(onFulFilled)
* then(onFulFilled, onRejected)

* then(
*    (value) => { fulfillment handler},
*    (reason) => { rejection handler}
*)
*/
