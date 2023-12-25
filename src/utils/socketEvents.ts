export const EVENTS = {
  NEW_CLIENT: "NEW_CLIENT",
  REQUEST_UPDATE: "REQUEST_UPDATE",
} as const;

export type SocketEvent = keyof typeof EVENTS;
