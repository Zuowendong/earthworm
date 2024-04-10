import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// @WebSocketGateway是一个装饰器，用于创建WebSocket网关类。WebSocket网关类是用于处理 WebSocket连接和消息的核心组件之一。
// 它充当WebSocket服务端的中间人，负责处理客户端发起的连接请求，并定义处理不同类型消息的逻辑

const room = 'earthworm';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000', // 允许的前端地址，这里要注意配置跨域问题
  },
})
export class EventGateway {
  constructor() {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join')
  handleJoin(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    const { name } = body || {};
    client.join(room);
    this.server.to(room).emit('join', `用户：${name}加入了房间 ${room}`);
  }

  // 离开房间
  @SubscribeMessage('leave')
  handleLeave(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    const { name } = body || {};
    // 先广播离开消息给房间内其他人
    this.server.to(room).emit('leave', `用户：${name}离开了房间 ${room}`);
    client.leave(room);
  }

  // 获取当前房间的人数
  @SubscribeMessage('getRoomUsers')
  handleGetRoomUsers() {
    const _room = this.server.sockets.adapter.rooms.get(room);
    console.log(this.server.sockets.sockets);
    if (_room) {
      this.server.to(room).emit('getRoomUsers', _room.size);
    } else {
      this.server.to(room).emit('getRoomUsers', 0);
    }
  }
}
