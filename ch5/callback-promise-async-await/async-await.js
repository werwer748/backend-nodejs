async function myName() {
  return "Hugo";
}

// console.log(myName()); // Promise { 'Hugo' }

async function showName() {
  // 1. 이름을 출력하는 함수
  const name = await myName();
  console.log(name);

  return name;
}

console.log(showName()); // 2. 콘솔에 이름 출력
