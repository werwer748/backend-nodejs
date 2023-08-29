const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const { ObjectId } = require("mongodb");

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
  // 1. 글쓰기 페이지로 이동 mode는 create
  res.render("write", { title: "테스트 게시판", mode: "create" });
});

// 2. 수정 페이지로 이동 mode는 modify(update)
app.get("/modify/:id", async (req, res) => {
  const { id } = req.params;
  // console.log("id확인 ::: ", req);
  // 3. getPostById() 함수를 사용해 게시글 정보를 가져옴
  // const post = await postService.getPostById(collection, req.params.id);
  const post = await postService.getPostById(collection, id);
  console.log("post확인 ::: ", post);
  res.render("write", { title: "테스트 게시판", mode: "modify", post });
});

// 4. 게시글 수정 API
app.post("/modify/", async (req, res) => {
  const { id, title, writer, password, content } = req.body;

  if (!password) {
    return res.status(400).send("패스워드가 없습니다.");
  }

  const post = {
    title,
    writer,
    password,
    content,
    createdDt: new Date().toISOString(),
  };

  // 5. 업데이트 결과
  const result = postService.updatePost(collection, id, post);
  res.redirect(`/detail/${id}`);
});

// 게시글 삭제 API
app.delete("/delete", async (req, res) => {
  const { id, password } = req.body;
  try {
    // collection의 deleteOne()을 사용해 게시글 하나를 삭제
    const result = await collection.deleteOne({ _id: ObjectId(id), password });
    // 삭제 결과가 잘못된 경우
    if (result.deletedCount !== 1) {
      console.log("삭제 실패");
      return res.json({ isSuccess: false });
    }
    return res.json({ isSuccess: true });
  } catch (error) {
    console.error(error);
    return res.json({ isSuccess: false });
  }
});

//댓글 추가
app.post("/write-comment", async (req, res) => {
  const { id, name, password, comment } = req.body;
  // 게시글 정보
  const post = await postService.getPostById(collection, id);

  // 3. 게시글에 기존 댓글 리스트가 있으면 추가
  if (post.comments) {
    post.comments.push({
      idx: post.comments.length + 1,
      name,
      password,
      comment,
      createdDt: new Date().toISOString(),
    });
  } else {
    // 게시글에 댓글 정보가 없으면 리스트에 댓글 정보 추가
    post.comments = [
      {
        idx: 1,
        name,
        password,
        comment,
        createdDt: new Date().toISOString(),
      },
    ];
  }

  postService.updatePost(collection, id, post);
  return res.redirect(`/detail/${id}`);
});

// 댓글 삭제
app.delete("/delete-comment", async (req, res) => {
  const { id, idx, password } = req.body;

  // 1. 게시글의 comments 안에 있는 특정 댓글 찾기
  const post = await collection.findOne(
    {
      _id: ObjectId(id),
      comments: { $elemMatch: { idx: parseInt(idx), password } },
    },
    postService.projectionOption
  );

  // 2. 데이터가 없으면 isSucces: false를 주고 종료
  if (!post) {
    return res.json({ isSuccess: false });
  }

  // 3. 댓글 번호가 idx 이외인 것만 comments에 다시 할당 후 저장
  post.comments = post.comments.filter(
    (comment) => comment.idx !== parseInt(idx)
  );
  postService.updatePost(collection, id, post);
  return res.json({ isSuccess: true });
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
  console.log("result확인 ::: ", result);
  res.render("detail", { title: "테스트 게시판", post: result.value });
});

app.post("/check-password", async (req, res) => {
  try {
    // 1. id, password 가져오기
    console.log("check-password req.body ::: ", req.body);
    const { id, password } = req.body;

    // 2. postService의 getPostByIdAndPassword() 함수를 사용해 게시글 데이터 확인
    const post = await postService.getPostByIdAndPassword(collection, {
      id,
      password,
    });

    // 3. 데이터가 있으면 isExist true, 없으면 false
    if (!post) {
      return res.status(404).json({ isExist: false });
    } else {
      return res.json({ isExist: true });
    }
  } catch (error) {
    console.error(error);
  }
});

app.listen(3000, async () => {
  console.log("서버시작 3000번 포트에서 대기중...");
  // mongodbConnection()의 결과는 mongoClient
  const mongoClient = await mongodbConnection();
  // mongoClient.db()로 디비 선택 collection()으로 컬렉션 선택 후 collection에 할당
  collection = mongoClient.db().collection("post");
  console.log("MongoDB 연결 성공!");
});
