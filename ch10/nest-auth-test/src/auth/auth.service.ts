import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable() // 프로바이더로 사용
export class AuthService {
  // UserService를 주입받음
  constructor(private userService: UserService) {}

  // 메서드 내부에 await 구문이 있으므로 async 필요
  async register(userDto: CreateUserDto) {
    // 이미 가입된 유저가 있는지 체크
    const user = await this.userService.getUser(userDto.email);
    if (user) {
      // 이미 가입된 유저가 있다면 에러 발생
      throw new HttpException(
        '해당 유저가 이미 존재합니다',
        HttpStatus.BAD_REQUEST,
      );
    }

    // 패스워드 암호화
    const encryptedPassword = bcrypt.hashSync(userDto.password, 10);

    // 데이터베이스에 저장. 저장 중 에러가 발생하면 서버에러 500
    try {
      const user = await this.userService.createUser({
        ...userDto,
        password: encryptedPassword,
      });

      // 회원가입 후 반환하는 값에는 password를 주지 않음
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException('서버 에러', 500);
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUser(email);

    if (!user) {
      // 유저가 없으면 검증 실패
      return null;
    }

    const { password: hashedPassword, ...userInfo } = user;

    if (bcrypt.compareSync(password, hashedPassword)) {
      // 패스워드가 일치하면 성공
      return userInfo;
    }
    return null;
  }
}
