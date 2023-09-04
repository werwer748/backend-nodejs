import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/user.dto';
import { AuthenticatedGuard, LocalAuthGuard, LoginGuard } from './auth.guard';

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

  @UseGuards(LoginGuard) // LoginGuard 사용
  @Post('login2')
  async login2(@Request() req, @Response() res) {
    console.log('login2 ==== ');
    // 쿠키 정보는 없지만 request에 user 정보가 있다면 응답값에 쿠키 정보 추가
    if (!req.cookies['login'] && req.user) {
      console.log('쿠키없음...', req.user);
      // 응답에 쿠키 정보 추가
      res.cookie('login', JSON.stringify(req.user), {
        httpOnly: true,
        // maxAge: 1000 * 60 * 60 * 24 * 7, // 1day
        maxAge: 1000 * 10, // 로그인 테스트를 고려해 10초로 설정
      });
      // res.cookie('login', '', {
      //   httpOnly: false,
      //   maxAge: 0,
      // });
    }
    return res.send({ message: 'login2 success' });
  }

  // 로그인을 한 때만 실행되는 메서드
  @UseGuards(LoginGuard)
  @Get('test-guard')
  testGuard() {
    // res.cookie(null);
    return '로그인된 때만 이 글이 보입니다.';
  }

  @UseGuards(LocalAuthGuard)
  @Post('login3')
  login3(@Request() req) {
    console.log('login3 ==== ', req.user);
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('test-guard2')
  testGuardWithSession(@Request() req) {
    return req.user;
  }
}
