import { createServer, Server as HTTPServer } from "node:http";
import { Server, Socket } from "socket.io";

export class SocketServer {
  public io: Server;
  private role: string[] = ["room-master","player"];

  constructor(server: Express.Application) {
    this.io = new Server(server, { cors: { origin: "*" } });
    this.io.on("connection", this.StartListeners);
    this.io.of("/").adapter.on("join-room", (room, id) => {
      console.log(`socket ${id} joined room ${room}`);
    });
  }

  StartListeners = (socket: Socket) => {
    const userLog = (username: string = "") => {
      console.log(
        `connected. Online users = ${this.io.engine.clientsCount}. User Id = ${username} | ${
          socket.id
        }. Current room = ${Array.from(socket.rooms)} `
      );
    };

    // Track message handlers for each room
    const messageHandlers = new Map<string, (msg: any) => void>();

    socket.on("room-id", (id,username: string) => {
      const eventName = `message-${id}`;

      // Remove existing listener for this room (if any)
      const existingHandler = messageHandlers.get(id);
      if (existingHandler) {
        socket.off(eventName, existingHandler); // Pass both event name AND handler
        messageHandlers.delete(id);
      }

      // Join the room
      socket.join(id);
      userLog(username);

      // Create new handler for this room
      const newHandler = (msg: any) => {
        this.io.to(id).emit(id, msg); // Send to room only
        console.log(`Message: ${msg} from ${socket.id}`);
      };

      // Add the new handler and save it
      socket.on(eventName, newHandler);
      messageHandlers.set(id, newHandler);

      socket.on("disconnect", () => {
        socket.leave(id);
        messageHandlers.forEach((handler, id) => {
          socket.off(`message-${id}`, handler);
        });
        userLog();
      });
    });

    // Cleanup on disconnect
    socket.on("disconnect", () => {
      messageHandlers.forEach((handler, id) => {
        socket.off(`message-${id}`, handler);
      });
      messageHandlers.clear();
      console.log(`User ${socket.id} disconnected`);
    });
  };
}
