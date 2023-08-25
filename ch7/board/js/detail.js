const postOption = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

async function modifiyPost() {
  const password = prompt("비밀번호를 입력해주세요."); // 프롬프트에서 취소를 누른 경우 처리

  if (!password) {
    return;
  } // check-password API 실행
  const result = await fetch("/check-password", {
    ...postOption,
    body: JSON.stringify({
      id: "{{post.id}}",
      password,
    }),
  }); // json함수를 실행하는 경우도 await를 해줘야 함

  const data = await result.json(); // 패스워드가 일치할 경우 수정 페이지로 이동

  if (data.isExist) {
    document.location = "/modify/{{post.id}}";
  } else {
    alert("패스워드가 올바르지 않습니다.");
  }
}

async function deletePost() {}
