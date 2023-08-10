const url = require("url");
const express = require("express");

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log("익스프레스로 라우터 리팩토링하기!");
});

// get메서드 라우팅 설정
app.get("/", (_, res) => res.end("HOME"));
app.get("/user", user);
app.get("/feed", feed);

function user(req, res) {
  const user = url.parse(req.url, true).query;

  // 결괏값 제공
  res.json(`[user] name : ${user.name}, age: ${user.age}`);
}

function feed(_, res) {
  // feed요청시 실행
  res.send(
    //json이 아니고 send로 보내야 됨.
    `<ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
        </ul>`
  );
}
