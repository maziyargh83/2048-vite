export const QueueStatusTypes = {
  WAITING: "waiting",
  DONE: "done",
};
export const QueueTypes = {
  MOVE: "move",
  REMOVE: "remove",
  CREATE: "create",
  UPDATE: "update",
};

export type QueueStatusKeyType =
  (typeof QueueStatusTypes)[keyof typeof QueueStatusTypes];

export type QueueKeyType = (typeof QueueTypes)[keyof typeof QueueTypes];

export interface QueueObjectType {
  id: string;
  status: QueueStatusKeyType;
  type: QueueKeyType;
  targetId: string;
  reserveID?: string;
}
