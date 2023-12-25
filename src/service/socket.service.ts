import { io } from "../lib/socket";
import { EVENTS } from "../utils/socketEvents";

interface ISocketClient {
  socketId: string;
  userId: string;
}

let clients: ISocketClient[] = [];

const getClient = (socketId: string) =>
  clients.find((c) => c.socketId === socketId);

const addNewClient = (socketId: string, userId: string) => {
  if (!!getClient(socketId)) return;
  clients.push({ socketId, userId });
};

const removeClient = (socketId: string) => {
  clients.filter((c) => c.socketId !== socketId);
};

io.on("connection", (socket) => {
  socket.on(EVENTS.NEW_CLIENT, (userId) => {
    addNewClient(socket.id, userId);
  });

  socket.on("disconnect", () => {
    removeClient(socket.id);
  });
});
