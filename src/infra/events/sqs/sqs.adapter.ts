import { EventStreamService } from '@domain/services/event-stream.service';
import { EventStreamPayload, EventStreamQueue } from '@domain/types';
import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';

import { MakeProvider } from '../../framework/factory/make-provider';

@Injectable()
export class SqsAdapter implements EventStreamService {
  constructor(private readonly sqsService: SqsService) {}

  async emit<T>(
    queue: EventStreamQueue,
    payload: EventStreamPayload<T>,
  ): Promise<void> {
    await this.sqsService.send<EventStreamPayload<T>>(queue.name, {
      body: payload,
      deduplicationId: payload.deduplicationId,
      groupId: payload.groupId,
      id: payload.id,
    });
  }
}

export const SqsAdapterProvider = MakeProvider.make(
  EventStreamService,
  SqsAdapter,
);
