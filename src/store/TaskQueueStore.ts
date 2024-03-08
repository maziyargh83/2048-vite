import { QueueObjectType } from "@/types/QueueTypes";
import { atom } from "jotai";

export const TaskQueueStore = atom<QueueObjectType[]>([]);
