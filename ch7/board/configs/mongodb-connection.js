const { MongoClient } = require("mongodb");

// 1. MongoDB 연결 주소
const uri =
  "mongodb+srv://hugokjg444:yRARNaizq4m9bXx6@cluster0.krywz5k.mongodb.net/board";

module.exports = function (callback) {
  return MongoClient.connect(uri, callback);
};
