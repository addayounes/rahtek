import { Server } from "socket.io";
import config from "../../config/config";

export const io = new Server(config.webSocket.port, {
  cors: {
    origin: "*",
  },
});
