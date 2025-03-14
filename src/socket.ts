import { createServer, Server as HTTPServer } from "node:http";
import { Server, Socket } from "socket.io";

export class SocketServer {
  public io: Server;
  constructor(server: Express.Application) {
    this.io = new Server(server,{cors:{origin:"*"}});
    this.io.on("connection", this.StartListeners);
    this.io.of("/").adapter.on("join-room",(room,id)=>{
        console.log(`socket ${id} joined room ${room}`);
    })
  }

  StartListeners = (socket:Socket) => {
    let roomId = "";
    const userLog = () =>{
      console.log(`connected. Online users = ${this.io.engine.clientsCount}. User Id = ${socket.id}. Current room = ${Array.from(socket.rooms)} `);
    }
    userLog()
    socket.on("room-id", (id) => {socket.join(id);userLog();roomId = id});
    socket.on(`message-room`,(msg)=>{
      this.io.emit(`message-room`,msg);
      console.log(`Message from room ${roomId} : ${msg}`);
    })
  }
}
