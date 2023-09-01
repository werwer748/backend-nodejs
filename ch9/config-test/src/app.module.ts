import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';
import config from './configs/config';

console.log('env: ', process.env.NODE_ENV);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`,
      // 환경 변수 파일 경로 지정
      load: [config], // 커스텀 설정 파일 설정
      cache: true, // 캐싱 설정 configService.get() 호출 시 캐시에서 먼저 불러와 성능상의 이점이 있음
      expandVariables: true, // 확장 변수 옵션을 추가
    }),
    WeatherModule,
  ], // ConfigModule 설정
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
