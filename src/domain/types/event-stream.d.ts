export type EventStreamPayload<T> = {
  deduplicationId?: string;
  eventName: string;
  eventVersion: number;
  groupId?: string;
  id?: string;
  occurredOn: Date;
  payload: T;
};

export type EventStreamQueue = {
  name: string;
  url: string;
};
