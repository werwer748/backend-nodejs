const axios = require("axios");

async function getTop20Movies() {
  // 1. await를 사용하므로 async를 붙임
  const url =
    "https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";

  try {
    const result = await axios.get(url); // 2. await로 기다림
    const { data } = result; // 결과값에는 data 프로퍼티가 있음

    if (!data.articleList || data.articleList.size == 0) {
      // data, articleList 가 없으면 에러
      throw new Error("데이터 없음");
    }

    // data에서 필요한 정보를 추출
    const movieInfos = data.articleList.map((article, idx) => {
      return { title: article.title, rank: idx + 1 };
    });

    // 데이터 출력
    for (let movieInfo of movieInfos) {
      console.log(`[${movieInfo.rank}위] ${movieInfo.title}`);
    }
  } catch (err) {
    // 3. 에러 처리
    throw new Error(err);
  }
}

// await은 함수 안에서만 사용 가능하므로 함수를 호출
getTop20Movies();
