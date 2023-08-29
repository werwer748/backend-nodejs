import { Module } from "@nestjs/common";
import { HelloController } from "./hello.controller";

@Module({
  // 1. 모듈 데코레이터.
  controllers: [HelloController], // 배열을 사용해 등록
})
export class HelloModule {}
