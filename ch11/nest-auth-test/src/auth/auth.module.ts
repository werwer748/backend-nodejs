import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [UserModule, PassportModule.register({ session: true })],
  // UserService를 사용하기 위해 UserModule을 import, PassportModule을 import

  providers: [AuthService, LocalStrategy, SessionSerializer, GoogleStrategy],
  // AuthService, LocalStrategy, SessionSerializer를 프로바이더로 등록

  controllers: [AuthController],
})
export class AuthModule {}
