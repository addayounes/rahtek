export const EVENTS = {
  NEW_CLIENT: "NEW_CLIENT",
  REQUEST_UPDATE: "REQUEST_UPDATE",
  REQUEST_CREATED: "REQUEST_CREATED",
} as const;

export type SocketEvent = keyof typeof EVENTS;
