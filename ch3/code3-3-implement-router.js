const http = require("http");
const url = require("url");

http
  .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname; // true는 쿼리스트링을 같이 파싱하게 해줌
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    if (path === "/user") {
      user(req, res);
    } else if (path === "/feed") {
      feed(req, res);
    } else {
      notFound(req, res);
    }
  })
  .listen("3000", () => console.log("라우터 만들기~2"));

const user = (req, res) => {
  res.end("[user] name: 깬디, age: 30");
};

const feed = (req, res) => {
  res.end(`
    <ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
    </ul>`);
};

const notFound = (req, res) => {
  res.statusCode = 404;
  res.end("404 page not found");
};
