import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // 레포지토리 주입 데코레이터
import { User } from './user.entity';
import { Repository } from 'typeorm'; // 레포지토리 임포트

@Injectable() // 의존성 주입을 위한 데코레이터
export class UserService {
  constructor(
    // 레포지토리 주입
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // 유저 생성
  createUser(user): Promise<User> {
    return this.userRepository.save(user);
  }

  // 유저 한명 조회
  async getUser(email: string) {
    const result = await this.userRepository.findOne({ where: { email } });
    return result;
  }

  // 유저 정보 업데이트
  async updateUser(email, _user) {
    const user: User = await this.getUser(email);
    console.log(_user);
    user.username = _user.username;
    user.password = _user.password;
    console.log(user);
    this.userRepository.save(user);
  }

  // 유저 삭제
  deleteUser(email: any) {
    return this.userRepository.delete({ email });
  }
}
