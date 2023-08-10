function func1() {
  //? //? 1. 콜스택에 func1이 쌓임
  console.log("1"); //? 2. 콜스택에 console.log("1")이 2번째로 쌓이고 바로 실행됨
  func2(); //? 3. 콜스택에 console.log("1")이 빠지고 func2가 쌓임
  return; //? 7. 콜스택에서 func1가 빠져나감
}

function func2() {
  //? 4.  콜스택에 func1, func2가 쌓여있음
  console.log("2"); //? 5. 콜스택에 console.log("2")이 3번째로 쌓이고 바로 실행됨
  return; //? 6. 콜스택에서 func2가 빠져나감
}

func1(); //? 0.실행, 8. 콜스택에서 func1이 빠져나가고 비워짐
