import { IsEmail, IsString } from 'class-validator';

// email, password, username 필드를 만들고 데코레이터 붙이기
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;
}

// 업데이트 유효성 검증시 사용할 DTO
export class UpdateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
