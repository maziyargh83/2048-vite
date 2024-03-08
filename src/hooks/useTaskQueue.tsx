import { createQueue } from "@/lib/queue";
import { TaskQueueStore } from "@/store/TaskQueueStore";
import {
  QueueKeyType,
  QueueStatusKeyType,
  QueueStatusTypes,
} from "@/types/QueueTypes";
import { useAtom } from "jotai";
import { v4 } from "uuid";

export const useTaskQueue = () => {
  const [queue, setQueue] = useAtom(TaskQueueStore);

  const addTask = (
    type: QueueKeyType,
    targetId: string,
    reserveID?: string
  ) => {
    setQueue([
      ...queue,
      createQueue({
        id: v4(),
        type,
        status: QueueStatusTypes.WAITING,
        targetId,
        reserveID,
      }),
    ]);
  };
  const updateTask = (id: string, status: QueueStatusKeyType) => {
    const newQueue = queue.map((item) => {
      if (item.targetId === id) {
        return {
          ...item,
          status,
        };
      }
      return item;
    });
    setQueue(newQueue);
  };
  const getLastTask = () => {
    return queue.shift();
  };
  const removeTask = (id: string) => {
    const res = queue.filter((i) => i.id !== id);
    setQueue(res);
    return res;
  };

  return {
    addTask,
    getLastTask,
    removeTask,
    queue,
    updateTask,
  };
};
