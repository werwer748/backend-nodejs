import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
// 1. PassportStrategy(Strategy) 상속
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    // 2. 생성자
    // 3. 부모 클래스의 생성자를 호출
    // console.log(process.env);
    super({
      clientID: process.env.GOOGLE_CLIENT_ID, // Google OAuth 클라이언트 ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google OAuth 클라이언트 비밀번호
      callbackURL: 'http://localhost:3000/auth/google', // 콜백 URL
      scope: ['email', 'profile'], // 요청할 권한
    });
  }

  // 4. OAuth 인증이 끝나고 콜백으로 실행되는 메서드
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('GoogleStrategy validate');
    const { id, name, emails } = profile;
    console.log(accessToken);
    console.log(refreshToken);

    const providerId = id;
    const email = emails[0].value;

    // 유저 정보 저장 혹은 가져오기
    const user: User = await this.userService.findByEmailOrSave(
      email,
      name.familyName + name.givenName,
      providerId,
    );

    console.log(providerId, email, name.familyName, name.givenName);
    return user;
  }
}
