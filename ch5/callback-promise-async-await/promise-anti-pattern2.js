function myWork(work) {
  return new Promise((resolve, reject) => {
    resolve(work.toUpperCase());
  });
}

function playGame(work) {
  return new Promise((resolve, reject) => {
    if (work === "DONE") {
      resolve("GO PLAY GAME");
    } else {
      reject(new Error("DON'T"));
    }
  });
}

// 1. 프로미스를 중첩해 사용하는 경우 => 안좋음...
myWork("done").then(function (result) {
  playGame(result).then(function (val) {
    console.log(val);
  });
});

// 2. 결과를 받아 then으로 넘기는 경우 => 좋음
myWork("done").then(playGame).then(console.log);
