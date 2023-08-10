const express = require("express"); // express 모듈을 가져옴
const app = express(); // express를 초기화 후 app 변수에 할당
const port = 3000;

app.get("/", (req, res) => {
  // 루트 경로 요청이 오는 경우 실행
  res.set({ "Content-Type": "text/html; charset=utf-8" }); // 헤더값 설정
  res.end("Hello Express!");
});

app.listen(port, () => {
  // 서버 실행 후 클라이언트 요청 대기
  console.log(`START SERVER : use ${port}`);
});
