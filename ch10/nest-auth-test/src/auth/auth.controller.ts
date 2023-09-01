import { Body, Controller, Post, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register') // POST /auth/register
  // class-validator를 사용하여 유효성 검사
  async register(@Body() userDto: CreateUserDto) {
    console.log('/auth/register');
    return await this.authService.register(userDto);
  }

  @Post('login') // POST /auth/login
  async login(@Request() req, @Response() res) {
    // console.log(req.body);
    // Request, Response 객체를 직접 사용
    // validateUser를 호출해 유저 정보 획득
    const userInfo = await this.authService.validateUser(
      req.body.email,
      req.body.password,
    );

    // 유저 정보가 있으면, 쿠키 정보를 Response에 저장
    if (userInfo) {
      res.cookie('login', JSON.stringify(userInfo), {
        httpOnly: false, // 브라우져에서 읽을 수 있도록 함
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7일 (밀리초 단위)
      });
    }

    return res.send({ message: 'login success' });
  }
}
