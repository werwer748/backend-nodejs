const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://hugokjg444:yRARNaizq4m9bXx6@cluster0.krywz5k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

/* 
? 기본 작성 해주는 함수
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("test").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/
async function run() {
  // 1. 비동기 처리함수
  try {
    await client.connect();

    const adminDB = client.db("test").admin(); // 2. admin DB 인스턴스

    const listDatabases = await adminDB.listDatabases(); // 3. 데이터베이스 정보 가져오기

    console.log(listDatabases);

    return "OK";
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().then(console.log).catch(console.dir);
