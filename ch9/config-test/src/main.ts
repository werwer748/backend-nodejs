import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService); // main.ts에서 환경변수를 사용하기 위해 ConfigService를 app.get()에 추가한다.
  await app.listen(configService.get('SERVER_PORT')); // configService 사용
}
bootstrap();
