import { io } from "../lib/socket";
import { EVENTS } from "../utils/socketEvents";

interface ISocketClient {
  socketId: string;
  userId: string;
}

let clients: ISocketClient[] = [];

const getClientById = (userId: string) =>
  clients.find((c) => c.userId === userId);

const addNewClient = (socketId: string, userId: string) => {
  const clientExists = getClientById(userId);

  if (!!clientExists) {
    if (clientExists.socketId === socketId) return;

    clients = clients.map((c) =>
      c.userId === userId ? { socketId, userId } : c
    );

    return;
  }
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

export { clients, getClientById };
