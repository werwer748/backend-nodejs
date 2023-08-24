const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Person = require("./person-model");

mongoose.set("strictQuery", false); // 1. 설정해줘야 경고가 뜨지 않음
//? strictQuery? 몽구스 쿼리에 필터를 빈 객체로 넣으면 모든 값을 불러오게 되어서 문제가 되는 경우 에러를 내도록 하는 설정

const app = express();
app.use(bodyParser.json()); // 2. HTTP에서 Body를 파싱하기 위한 설정

app.listen(3000, async () => {
  console.log("Server is listening on port 3000");

  const mongodbUri =
    "mongodb+srv://hugokjg444:yRARNaizq4m9bXx6@cluster0.krywz5k.mongodb.net/test?retryWrites=true&w=majority";

  // 3. 몽고디비에 커넥션 맺기
  mongoose
    .connect(mongodbUri, { useNewUrlParser: true })
    .then(console.log("Connected to MongoDB"));
});

// 4. 모든 person 데이터 출력
app.get("/person", async (req, res) => {
  const person = await Person.find({}); // 빈 객체를 넣으면 모든 데이터를 불러옴
  res.send(person);
});

// 5. 특정 이메일로 person 찾기
app.get("/person/:email", async (req, res) => {
  const person = await Person.findOne({ email: req.params.email });
  res.send(person);
});

// 6. person 데이터 추가하기
app.post("/person", async (req, res) => {
  const person = new Person(req.body);
  // const result = await person.create(req.body); // 이렇게도 가능
  await person.save();
  res.send(person);
});

// 7. person 데이터 수정하기
app.put("/person/:email", async (req, res) => {
  /**
   * updateOne의 경우
   * Person.updateOne({ email: req.params.email }, { $set: req.body });
   * 결과값이 문서가 아니라 동작의 결과값이 반환됨
   */
  const person = await Person.findOneAndUpdate(
    { email: req.params.email },
    { $set: req.body },
    { new: true }
  );

  console.log(person);
  res.send(person);
});

// 8. person 데이터 삭제하기
app.delete("/person/:email", async (req, res) => {
  await Person.deleteMany({ email: req.params.email });
  res.send({ success: true });
});
