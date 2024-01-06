import { SqsMessageReceived } from '../contracts/infra-layer/events/sqs-message-received';

export abstract class Consumer {
  abstract handle(message: SqsMessageReceived): Promise<void>;
}
