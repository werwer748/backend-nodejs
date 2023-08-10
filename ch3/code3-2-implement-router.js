const http = require("http");
const url = require("url"); // url 모듈

http
  .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname; // 패스명 할당
    res.setHeader("Content-Type", "text/html; charset=utf-8"); // 응답의 헤더 설정

    if (path === "/user") {
      res.end("[user] name: 깬디, age: 30"); // user 결괏값
    } else if (path === "/feed") {
      res.end(`
    <ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
    </ul>`);
    } else {
      res.statusCode = 404;
      res.end("404 page not found"); // 결과값으로 에러 메시지 설정
    }
  })
  .listen("3000", () => console.log("라우터 만들기~!~!!")); // 접속 대기
