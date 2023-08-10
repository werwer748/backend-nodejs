const http = require("http"); //? 1. http 객체 생성

let count = 0; //* 전역 변수로 로그를 간단히 남기기 위해 선언

const server = http.createServer((req, res) => {
  //? 2. http 객체를 통해 서버 생성
  log("카운트 확인", count); //? 3. 카운트 1 증가

  res.statusCode = 200; //? 4. 응답 상태 코드 200
  res.setHeader("Content-Type", "text/plain"); //? 5. 응답 헤더 설정
  res.write("hello\n"); //? 6. 응답값 설정
  setTimeout(() => {
    //? 7. 2초 후 출력
    res.end("Node.js");
  }, 2000);
});

function log(count) {
  console.log((count += 1));
  3;
}

server.listen(8000); //8000번 포트로 서버 실행
