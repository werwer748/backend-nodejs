const express = require("express");
const app = express();
let posts = []; // 게시글 리스트로 활용할 빈 배열

//? 미들웨어를 사용할 때 app.use() 를 사용한다.
//req.body를 사용하기 위해 JSON 미들웨어를 사용해야 함
// 사용하지 않을시 undefined
app.use(express.json()); // JSON 미들웨어 추가

// POST 요청 시 컨텍트 타입이 application/x-www-form-urlencoded인 경우 파싱해준다.
//application/x-www-form-urlencoded? body에 키=값 조합 형태의 데이터를 말한다? => 근데 대부분 다 키=값 아닌가...?
/*
extended: false로 옵션을 주면 NodeJs에 기본으로 내장된 querystring모듈을 사용합니다.
extended: true를 하면 추가로 설치가 필요한 qs모듈을 사용합니다.
=> 출력 형태가 달라지는데 이건 추후 이것저것 테스트 해봐야겠음
*/
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // GET / 요청에 대한 라우터
  res.json(posts); // 게시글 리스트를 JSON 형식으로 반환
});

app.post("/posts", (req, res) => {
  // POST /posts 요청에 대한 라우터
  const { title, name, text } = req.body; // 요청의 body에서 title, name, text 추출

  // 게시글 정보 추가
  posts.push({
    id: posts.length + 1,
    title,
    name,
    text,
    createdDt: Date(),
  });
  res.json({ title, name, text });
});

app.delete("/posts/:id", (req, res) => {
  console.log(req.params.id);
  // DELETE /posts/:id 요청에 대한 라우터
  const id = req.params.id; //app.delete()의 첫번째 인자로 들어온 :id를 req.params.id로 추출
  const filteredPosts = posts.filter((post) => post.id !== +id); // id가 일치하지 않는 게시글만 필터링
  const isLengthChanged = posts.length !== filteredPosts.length; // 게시글이 삭제되었는지 확인
  posts = filteredPosts; // 삭제된 게시글로 업데이트
  if (isLengthChanged) {
    res.json("OK"); // 삭제 성공!
    return;
  }
  res.json("NOT CHANGED"); // 삭제 실패!
});

app.listen(3000, () => {
  console.log("welcome posts START!");
});
