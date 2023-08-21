function goodPromise(val) {
  // 1. Promise 객체를 생성 후 반환
  return new Promise((resolve, reject) => {
    resolve(val);
  });
}

goodPromise("세상에")
  // 2. Promise에서 resolve 이후에는 then 메서드를 사용할 수 있음
  .then((val) => {
    return val + " 이런";
  })
  .then((val) => {
    return val + " 코드는";
  })
  .then((val) => {
    return val + " 없습니다.";
  })
  .then((val) => {
    console.log(val);
  })
  .catch((err) => {
    // 3. Promise에서 reject가 호출되었을 경우 실행
    console.log(err);
  });
