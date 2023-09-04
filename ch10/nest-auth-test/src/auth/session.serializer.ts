import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from '../user/user.service';

@Injectable()
// 1. PassportSerializer를 상속받음
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    // 2. UserService 주입
    super();
  }

  // 3. 세션에 정보를 저장할 때 사용
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user.email); // 세션에 저장할 정보
  }

  // 4. 세션에서 정보를 꺼내올 때 사용
  async deserializeUser(
    payload: any,
    done: (err: Error, payload: any) => void,
  ): Promise<any> {
    const user = await this.userService.getUser(payload);
    // 5. 유저 정보가 없는 경우 done() 함수에 에러 전달
    if (!user) {
      done(new Error('user not found'), null);
      return;
    }
    const { password, ...userInfo } = user;

    // 6. 유저 정보가 있다면 유저 정보 반환
    done(null, userInfo);
  }
}
