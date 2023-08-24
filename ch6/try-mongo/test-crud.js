const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://hugokjg444:yRARNaizq4m9bXx6@cluster0.krywz5k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// 1. MongoClient 생성
const client = new MongoClient(uri, {
  //   serverApi: {
  //     version: ServerApiVersion.v1,
  //     strict: true,
  //     deprecationErrors: true,
  //   },
  //* mongodb 3.0 이상부터는 아래 옵션을 추가해야함(몽고디비 아틀라스 연길시 해당 옵션 사용해야 함)
  useNewUrlParser: true,
});

async function main() {
  try {
    // 2. 커넥션을 생성하고 연결 시도
    await client.connect();

    console.log("MongoDB 접속 성공!");

    // 3. test 데이터베이스의 person 컬렉션 가져오기 - 존재하지 않으면 자동 생성
    const collection = client.db("test").collection("person");

    // 4. 문서 하나 추가
    await collection.insertOne({ name: "Hugo", age: 30 });
    console.log("문서 추가 완료");

    // 5. 문서 찾기
    const documents = await collection.find({ name: "Hugo" }).toArray(); // 결과가 여러개일 수 있어서 toArray() 사용
    console.log("찾은 문서: ", documents);

    // 6. 문서 갱신하기
    await collection.updateOne({ name: "Hugo" }, { $set: { age: 45 } });
    // $set은 몽고디비 연산자로 값을 필드에 지정할 때 사용
    console.log("문서 업데이트! 완료");

    // 7. 갱신된 문서 확인하기
    const updatedDocument = await collection.find({ name: "Hugo" }).toArray();
    console.log("갱신된 문서: ", updatedDocument);

    // 8. 문서 삭제하기
    // await collection.deleteOne({ name: "Hugo" });
    // console.log("문서 삭제 완료");

    // 9. 연결 종료
    await client.close();
  } catch (err) {
    console.error(err);
  }
}

main();
