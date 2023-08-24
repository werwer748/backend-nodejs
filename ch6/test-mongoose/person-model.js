var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// 1. 스키마 객체 생성
const personSchema = new Schema({
  name: String,
  age: Number,
  email: { type: String, required: true },
});

module.exports = mongoose.model("Person", personSchema); // 2. 모델 객체 생성
