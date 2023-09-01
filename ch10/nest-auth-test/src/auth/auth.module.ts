import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule], // UserService를 사용하기 위해 UserModule을 import
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
