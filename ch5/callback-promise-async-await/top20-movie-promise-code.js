const axios = require("axios");

const url = // 1. 요청할 URL
  "https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";

axios
  .get(url) // 2. GET 요청
  .then((result) => {
    // 결과값 처리
    if (result.status !== 200) {
      // 상태가 200 아니면 에러
      throw new Error("요청 실패!!");
    }

    if (result.data) {
      return result.data; // 3. result.data가 존재하면 반환
    }

    throw new Error("데이터 없음"); // result.data가 없으면 에러
  })
  .then((data) => {
    // 4. 3에서 받은 데이터 처리
    if (!data.articleList || data.articleList.size == 0) {
      // 5. 크기가 0이면 에러
      throw new Error("데이터 없음");
    }
    return data.articleList; // 6. 영화 리스트 반환
  })
  .then((articles) => {
    return articles.map((article, idx) => {
      // 7. 영화 리스트를 제목과 순위 정보로 분리
      return { title: article.title, rank: idx + 1 };
    });
  })
  .then((results) => {
    for (let movieInfo of results) {
      // 받은 영화 리스트 출력
      console.log(`[${movieInfo.rank}위] ${movieInfo.title}`);
    }
  })
  .catch((err) => {
    // 8. 중간에 발생한 에러 처리
    console.log("<<에러발생>>");
    console.error(err);
  });
