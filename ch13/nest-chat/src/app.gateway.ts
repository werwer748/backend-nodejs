import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chat' }) // 1. 웹소켓 서버 설정 데코레이터
export class ChatGateway {
  @WebSocketServer() server: Server; // 2. 웹소켓 서버 인스턴스 선언

  @SubscribeMessage('message') // 3. 'message' 이벤트 구독
  handleMessage(socket: Socket, data: any): void {
    const { message, nickname } = data; // 메시지와 닉네임을 data에서 추출
    // // 4. 접속한 클라이언트들에 메시지 전송
    // this.server.emit(
    //   'message',
    //   `client-${socket.id.substring(0, 4)} : ${data}`,
    // );
    socket.broadcast.emit('message', `${nickname}: ${message}`);
  }
}

@WebSocketGateway({ namespace: 'room' }) // 1. room 네임스페이스를 사용하는 게이트웨이
export class RoomGateway {
  // 채팅 게이트웨이 의존성 주입
  constructor(private readonly chatGateway: ChatGateway) {}
  rooms = [];

  @WebSocketServer() server: Server; // 2. 웹소켓 서버 인스턴스 선언

  @SubscribeMessage('createRoom') // 3. createRoom 핸들러 메서드
  handleMessage(@MessageBody() data) {
    // 4. 소켓없이 데이터만 받음
    const { nickname, room } = data;
    // 방 생성 시 이벤트 발생시켜 클라리언트에 송신
    this.chatGateway.server.emit('notice', {
      message: `${nickname}님이 ${room}방을 생성했습니다.`,
    });
    this.rooms.push(room); // 5. 채팅방 정보 받아서 추가
    this.server.emit('rooms', this.rooms); // rooms 이벤트로 채팅방 리스트 전송
  }

  @SubscribeMessage('joinRoom') // 방입장 시 실행되는 핸들러 메서드
  handleJoinRoom(socket: Socket, data) {
    const { nickname, room, toLeaveRoom } = data;
    socket.leave(toLeaveRoom); // 기존의 방에서 먼저 나감
    this.chatGateway.server.emit('notice', {
      // 공지 이벤트 발생
      message: `${nickname}님이 ${room}방에 입장했습니다.`,
    });
    socket.join(room); // 새로운 방에 입장
  }

  @SubscribeMessage('message') // RoomGateway로 message 이벤트가 오면 처리
  handleMessageToRoom(socket: Socket, data) {
    const { nickname, room, message } = data;
    console.log(data);
    socket.broadcast.to(room).emit('message', {
      // to를 사용해 지정한 채팅방의 나 이외의 사람에게 데이터 전송
      message: `${nickname}: ${message}`,
    });
  }
}
