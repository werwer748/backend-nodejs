function waitOneSecond(msg) {
  // 1. 1초 대기하고 메시지 출력
  return new Promise((resolve, _) => {
    setTimeout(() => resolve(`${msg}`), 1000);
  });
}

async function countOneToTen() {
  // 2. 10초 동안 1초마다 메시지 출력
  for (let x of [...Array(10).keys()]) {
    let result = await waitOneSecond(`${x + 1}초 대기 중...`);
    console.log(result);
  }
  console.log("끝!");
}

countOneToTen();

// console.log([...Array(10).keys()]); // [0 ~ 9]
