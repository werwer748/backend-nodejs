console.log("1"); //? 1. 코드의 첫 줄을 읽어서 콜스테에 console.log("1");가 추가
//? 2. 콜스택에 console.log("1");이 있으므로 실행 콜스택은 비워진다.

setTimeout(() => console.log(2), 1000); //? 3. 콜스택에 setTimeout()이 추가 됨.
//? 4. setTimeout()은 Node.js API. 주어신 시간(1초)동안 대기한다.

console.log("3"); //? 5. 콜스택에 console.log("3");이 추가
//? 6. 콜스택에 console.log("3");이 있으므로 실행 콜스택은 비워진다.

//? 7. 지정된 시간(1초)이 지나고 Node.js API에서 setTimeout()을 이벤트 루프의 태스크 큐로 추가한다.
//? 8. 태크스 큐의 setTimeout()을 이벤트 루프의 각 단계를 진행하면서 콜 스택에 다시 추가한다.
//? 9. 콜 스택에 추가한 setTimeout()을 실행하면서 console.log(2)를 실행한다.

//* setTimeout()의 시간을 0으로 잡아도 같은 결과가 나온다. Node.js API에서 기다리는 시간이 0일뿐 이벤트루프의 태스크 큐에 추가되는 방식은 동일하기 때문이다.
