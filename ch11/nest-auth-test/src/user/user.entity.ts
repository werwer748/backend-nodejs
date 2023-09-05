import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // 엔티티 객체임을 알려주기 위한 데코레이터 => 붙여줘야 다른곳에 의존성 주입을 할 수 있다.
export class User {
  @PrimaryGeneratedColumn()
  // PrimaryGeneratedColumn: 기본 키 컬럼이며 자동으로 증가
  id?: number; // id는 pk이며 자동 증가하는 값 => 자동 증가하기 때문에 ?를 붙여 선택적인 값임을 표시

  // Column: 컬럼임을 알려주는 데코레이터
  @Column({ unique: true }) // unique: true 일 경우 데이터 중복을 방지
  email: string; // 이메일은 유일한(유니크한) 값이어야 함

  @Column({ nullable: true }) // nullable: true 일 경우 null 허용
  password: string;

  @Column()
  username: string;

  @Column({ default: true }) // 기본 값을 넣어줌
  createdDt: Date = new Date();

  @Column({ nullable: true }) // providerId에 빈값 허용
  providerId: string; // providerId 추가
}
