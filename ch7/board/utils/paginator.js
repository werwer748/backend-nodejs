const lodash = require("lodash");
const PAGE_LIST_SIZE = 10; // 2. 최대 몇 개의 페이지를 보여줄지 설정

// 3. 총 개수, 페이지, 한 페이지에 표시하는 게시물 개수를 매개변수로 받음
module.exports = ({ totalCount, page, perPage = 10 }) => {
  const PER_PAGE = perPage;
  const totalPage = Math.ceil(totalCount / PER_PAGE); // 4. 총 페이지 수 계산

  // 시작 페이지 : 몫 * PAGE_LIST_SIZE + 1

  let quotient = parseInt(page / PAGE_LIST_SIZE);
  if (page % PAGE_LIST_SIZE === 0) {
    quotient -= 1;
  }
  const startPage = quotient * PAGE_LIST_SIZE + 1; // 5. 시작 페이지 구하기

  // 6. 끝 페이지 : startPgae + PAGE_LIST_SIZE - 1
  const endPage =
    startPage + PAGE_LIST_SIZE - 1 < totalPage
      ? startPage + PAGE_LIST_SIZE - 1
      : totalPage; // 끝 페이지 구하기

  const isFirstPage = page === 1; // 현재 페이지가 1인지 여부
  const isLastPage = page === totalPage; // 현재 페이지가 마지막 페이지인지 여부
  const hasPrev = page > 1; // 이전 페이지가 있는지 여부
  const hasNext = page < totalPage; // 다음 페이지가 있는지 여부

  const paginator = {
    // 7. 표시할 페이지 번호 리스트를 만들어줌
    pageList: lodash.range(startPage, endPage + 1),
    page,
    prevPage: page - 1,
    nextPage: page + 1,
    startPage,
    lastPage: totalPage,
    hasPrev,
    hasNext,
    isFirstPage,
    isLastPage,
  };

  return paginator;
};
