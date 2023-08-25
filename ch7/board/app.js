const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");

const app = express();

//? 몽고디비 연결 함수
const mongodbConnection = require("./configs/mongodb-connection");

//? 서비스 파일 로딩
const postService = require("./services/post-service");

//? req.body와 POST 요청을 해석하기 위한 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  "handlebars", // 1. 템플릿 엔진 등록
  handlebars.create({
    // 핸들바 생성 및 엔진 반환
    helpers: require("./configs/handlebars-helpers"),
  }).engine
);
app.set("view engine", "handlebars"); // 2. 웹페이지 로드 시 사용할 템플릿 엔진 설정
app.set("views", __dirname + "/views"); // 3. 뷰 디렉토리를 views로 설정

//4. 라우터 설정
app.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1; // 현재 페이지 데이터
  const search = req.query.search || ""; // 검색어 데이터

  try {
    // postService.list에서 글 목록과 페이지네이터를 가져옴
    const [posts, paginator] = await postService.list(collection, page, search);

    // 리스트 페이지 렌더링
    res.render("home", { title: "테스트 게시판", search, paginator, posts });
  } catch (error) {
    console.error(error);
    // 에러시 빈 값으로 렌더링
    res.render("home", { title: "테스트 게시판" });
  }
});

app.get("/write", (req, res) => {
  res.render("write", { title: "테스트 게시판" });
});

app.post("/write", async (req, res) => {
  const post = req.body;
  console.log("post확인 ::: ", post);
  // 2. 글쓰기 후 결과 반환
  const result = await postService.writePost(collection, post);
  // 3. 생성된 도큐먼트의 _id를 detail로 리다이렉트
  res.redirect(`/detail/${result.insertedId}`);
});

app.get("/detail/:id", async (req, res) => {
  // 1. 게시글 정보 가져오기
  const result = await postService.getDetailPost(collection, req.params.id);
  res.render("detail", { title: "테스트 게시판", post: result.value });
});

app.listen(3000, async () => {
  console.log("서버시작 3000번 포트에서 대기중...");
  // mongodbConnection()의 결과는 mongoClient
  const mongoClient = await mongodbConnection();
  // mongoClient.db()로 디비 선택 collection()으로 컬렉션 선택 후 collection에 할당
  collection = mongoClient.db().collection("post");
  console.log("MongoDB 연결 성공!");
});
