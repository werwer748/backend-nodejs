/* eslint-disable @typescript-eslint/no-unused-vars */
const socket = io('http://localhost:3000/chat');
const roomSocket = io('http://localhost:3000/room'); // 채팅방용 네임스페이스 생성
const nickname = prompt('닉네임을 입력해주세요.');
let currentRoom = ''; // 채팅방 초기값

socket.on('connect', () => {
  console.log('connected');
});

function sendMessage() {
  if (currentRoom === '') {
    alert('채팅방에 입장해주세요.');
    return;
  }
  const message = $('#message').val();
  const data = { message, nickname, room: currentRoom };
  $('#chat').append(`<div>나 : ${message}</div>`); // 내가 보낸 메시지 바로 추가
  roomSocket.emit('message', data); // RoomGateway로 메시지를 보내기
  return false;
}

socket.on('message', (message) => {
  $('#chat').append(`<div>${message}</div>`);
});

function createRoom() {
  const room = prompt('생성할 방의 이름을 입력해주세요.');
  roomSocket.emit('createRoom', { room, nickname });
}

socket.on('notice', (data) => {
  $('#notice').append(`<div>${data.message}</div>`);
});

roomSocket.on('message', (data) => {
  console.log(data);
  $('#chat').append(`<div>${data.message}</div>`);
});

roomSocket.on('rooms', (data) => {
  console.log(data);
  $('#rooms').empty();
  data.forEach((room) => {
    $('#rooms').append(
      `<li>${room} <button onclick="joinRoom('${room}')">join</button></li>`,
    );
  });
});

function joinRoom(room) {
  roomSocket.emit('joinRoom', { room, nickname, toLeaveRoom: currentRoom });
  $('#chat').html('');
  currentRoom = room;
}
