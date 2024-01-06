import { EventStreamPayload, EventStreamQueue } from '../types';

export abstract class EventStreamService {
  abstract emit<T>(
    queue: EventStreamQueue,
    payload: EventStreamPayload<T>,
  ): Promise<void>;
}
