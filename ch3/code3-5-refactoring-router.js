const http = require("http");
const url = require("url");

http
  .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    if (path in urlMap) {
      try {
        urlMap[path](req, res);
      } catch (error) {
        console.log(error);
        serverError(req, res); // 서버에러 처리
      }
    } else {
      notFound(req, res);
    }
  })
  .listen("3000", () => console.log("라우터 리팩토링 해보기:::"));

const user = (req, res) => {
  //   throw new Error("에러 발생"); // 에러 발생시켜봄
  const userInfo = url.parse(req.url, true).query;

  res.end(`[name] name: ${userInfo.name}, [age] age: ${userInfo.age}`);
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

const serverError = (req, res) => {
  res.statusCode = 500;
  res.end("500 server error");
};

const urlMap = {
  "/": (req, res) => res.end("HOME"),
  "/user": user,
  "/feed": feed,
};
