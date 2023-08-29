const paginator = require("../utils/paginator");
const { ObjectId } = require("mongodb");

// 글쓰기
async function writePost(collection, post) {
  // 생성일시와 조회수를 넣는다.
  post.hits = 0;
  post.createdDt = new Date().toISOString(); // 날짜는 ISO 형식으로 저장
  return await collection.insertOne(post); // 몽고디비에 post를 저장 후 결과 반환
}

// 글목록
async function list(collection, page, search) {
  const perPage = 10;
  // 1. title이 search와 부분 일치하는지 확인
  const query = { title: new RegExp(search, "i") };

  // 2. limit는 10개만 가져온다는 의미, skip은 설정된 개수만큼 건너뛴다, 생성일의 역순으로 정렬
  const cursor = collection
    .find(query, { limit: perPage, skip: (page - 1) * perPage })
    .sort({ createdDt: -1 });

  // 3. 검색어에 걸리는 게시물의 총합
  const totalCount = await collection.count(query);
  const posts = await cursor.toArray(); // 4. 검색된 게시물을 배열로 변환

  // 5. 페이지네이터 생성
  const paginatorObj = paginator({ totalCount, page, perPage: perPage });
  return [posts, paginatorObj];
}

// 1. 패스워드는 노출되면 안되니까 안가져옴.
const projectionOption = {
  projection: {
    // 프로젝션(투영): 결과값에서 일부만 가져올 때 사용
    password: 0,
    "comments.password": 0,
  },
  /*
  projection: {title:1, content:1, createdDt:1, hits:1, comments:1}
  과 같다.
  */
};

async function getDetailPost(collection, id) {
  // 2. 몽고디비 Collection의 findOneAndUpdate() 함수를 사용
  // 게시글을 읽을 때마다 hits를 1 증가
  return await collection.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $inc: { hits: 1 } },
    projectionOption // projection, sort, upsert, returnOriginal 등의 옵션을 설정할 수 있음
  );
}

async function getPostByIdAndPassword(collection, { id, password }) {
  // 1. findOne 사용
  return await collection.findOne(
    { _id: ObjectId(id), password },
    projectionOption
  );
}

// 2. id로 데이터 불러오기
async function getPostById(collection, id) {
  return await collection.findOne({ _id: ObjectId(id) }, projectionOption);
}

// 3. 게시글 수정
async function updatePost(collection, id, post) {
  const toUpdatePost = {
    $set: {
      ...post,
    },
  };
  return await collection.updateOne({ _id: ObjectId(id) }, toUpdatePost);
}

module.exports = {
  list,
  writePost,
  getDetailPost,
  getPostByIdAndPassword,
  getPostById,
  updatePost,
};
