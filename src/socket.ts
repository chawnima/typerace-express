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
    socket.join("room1");
    console.log(`connected. Online users = ${this.io.engine.clientsCount}. User Id = ${socket.id}. Current room = ${Array.from(socket.rooms)} `);
    socket.on("message", (data) => {console.log("connect")});
  }
}
