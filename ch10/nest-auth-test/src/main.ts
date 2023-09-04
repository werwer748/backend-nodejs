import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(
    session({
      secret: 'very-important-secret', // 세션 암호화에 사용되는 키
      resave: false, // 세션을 항상 저장할지 여부 => 효율성을 위해
      saveUninitialized: false, // 세션 저장 전 초기화되지 않은 상태로 세션을 미리만들어 저장할지 여부
      cookie: { maxAge: 3600000 }, // 쿠키 유효시간 1시간
    }),
  );
  // passport 초기화 및 세션 저장소 초기화
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
