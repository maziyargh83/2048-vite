import { QueueObjectType } from "@/types/QueueTypes";

export const createQueue = ({
  id,
  type,
  status,
  targetId,
  reserveID,
}: QueueObjectType): QueueObjectType => {
  return {
    id,
    status,
    type,
    targetId,
    reserveID,
  };
};
